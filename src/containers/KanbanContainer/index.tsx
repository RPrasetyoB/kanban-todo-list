/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./kaban.module.scss";
import { AddTaskModal, TaskCard } from "../../components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { PublicData } from "../../utils/globalStateProvider";
import { getGroup, getItemList, updateTask } from "../../utils/fetchApi";

const KanbanContainer = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [groupId, setGroupId] = useState(0);
  const { todoList, dataChanged } = useContext(PublicData);
  const [draggingSource, setDraggingSource] = useState<string | null>(null);

  const initialColumns = todoList?.reduce((acc, curr) => {
    acc[curr.ID.toString()] = curr;
    return acc;
  }, {} as { [key: string]: Column });

  const [columns, setColumns] = useState<{ [key: string]: Column }>(initialColumns);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getGroup();
        const todosData = await response.json();
        if (response.ok) {
          const updatedColumns: { [key: string]: Column } = {};
          await Promise.all(
            Object.values(todosData.data).map(async (todo: any) => {
              const itemsResponse = await getItemList(todo.ID);
              const itemsData = await itemsResponse.json();
              if (itemsResponse.ok) {
                const filteredItems = itemsData.data.filter(
                  (item: any) => item.todo_id === todo.ID
                );
                (updatedColumns[todo.ID] as any) = {
                  title: todo.title,
                  items: filteredItems,
                };
              }
            })
          );
          setColumns(updatedColumns);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [dataChanged]);

  const subTitle = ["January - March", "April - June", "July - September", "October - December"];

  const onDragStart = (result: any) => {
    setDraggingSource(result.source.droppableId);
  };

  const onDragEnd = async (result: any) => {
    setDraggingSource(null);
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const updatedColumns = { ...columns };
    const sourceColumn = updatedColumns[source.droppableId];
    const destColumn = updatedColumns[destination.droppableId];

    // Get the task details using the draggableId
    const taskElement = document.querySelector(`[data-id='${draggableId}']`);
    const taskId = taskElement?.getAttribute("data-id");
    const taskName = taskElement?.getAttribute("data-name");
    const taskProgressPercentage = taskElement?.getAttribute("data-progress_percentage");

    console.log("task element", taskElement);
    console.log("taskId", taskId);
    console.log("taskName", taskName);
    console.log("taskProgressPercentage", taskProgressPercentage);

    if (source.droppableId === destination.droppableId) {
      const newItems = Array.from(sourceColumn.items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      setColumns({
        ...updatedColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: newItems,
        },
      });
    } else {
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const newGroupId = Number(destination.droppableId);
      setGroupId(newGroupId);
      await updateTask(
        {
          todo_id: newGroupId,
          name: taskName,
          progress_percentage: Number(taskProgressPercentage),
        },
        Number(taskId)
      );

      setColumns({
        ...updatedColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Box className={styles.container}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <Droppable
            key={columnId}
            droppableId={columnId}
            isDropDisabled={draggingSource === columnId}
          >
            {provided => (
              <Box className={styles.tasklist}>
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Box>
                      <span className={styles.title}>{column.title}</span>
                    </Box>
                    <span className={styles.subTitle}>{subTitle[index]}</span>
                  </Box>
                  {column.items.length === 0 && (
                    <Box className={styles.empty}>
                      <Typography
                        sx={{
                          fontFamily: "Nunito Sans, sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#757575",
                        }}
                      >
                        No Task
                      </Typography>
                    </Box>
                  )}
                  {column.items.map((item, index) => (
                    <TaskCard key={item.ID.toString()} item={item} index={index} group={columnId} />
                  ))}
                  {provided.placeholder}
                </Box>
                <button
                  className={styles.button}
                  onClick={() => {
                    setAddTaskModal(true);
                    setGroupId(Number(columnId));
                  }}
                >
                  <AddCircleOutlineIcon sx={{ width: "20px" }} />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Nunito Sans, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    New Task
                  </Typography>
                </button>
                <AddTaskModal open={addTaskModal} setOpen={setAddTaskModal} column={groupId} />
              </Box>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanContainer;
