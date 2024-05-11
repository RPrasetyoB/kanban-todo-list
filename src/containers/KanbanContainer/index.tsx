/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "./kaban.module.scss";
import { AddTaskModal, TaskCard } from "../../components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { PublicData } from "../../utils/globalStateProvider";
import { getGroup, getItemList } from "../../utils/fetchApi";

const KanbanContainer = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [groupId, setGroupId] = useState(0);
  const { todoList, dataChanged } = useContext(PublicData);
  const initialColumns = todoList?.reduce((acc, curr) => {
    acc[curr.id.toString()] = curr;
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
            Object.values(todosData).map(async (todo: any) => {
              const itemsResponse = await getItemList(todo.id);
              const itemsData = await itemsResponse.json();
              if (itemsResponse.ok) {
                const filteredItems = itemsData.filter((item: any) => item.todo_id === todo.id);
                (updatedColumns[todo.id] as any) = {
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

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedColumns = { ...columns };
    const sourceColumn = updatedColumns[source.droppableId];
    const destColumn = updatedColumns[destination.droppableId];

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className={styles.container}>
        {Object.entries(columns).map(([columnId, column], index) => (
          <Droppable key={columnId} droppableId={columnId}>
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
                    <TaskCard key={item.id.toString()} item={item} index={index} group={columnId} />
                  ))}
                  {provided.placeholder}
                </Box>
                <button
                  className={styles.button}
                  onClick={() => {
                    setAddTaskModal(true);
                    setGroupId(parseInt(columnId));
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
