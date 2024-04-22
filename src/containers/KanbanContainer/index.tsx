/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import styles from "./kaban.module.scss";
import { todos } from "./KanbanData";
import { TaskCard } from "../../components";

interface Column {
  id: number;
  title: string;
  items: any[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

const KanbanContainer = () => {
  const initialColumns = todos.reduce((acc, curr) => {
    acc[curr.id.toString()] = curr;
    return acc;
  }, {} as { [key: string]: Column });
  const [columns, setColumns] = useState<{ [key: string]: Column }>(
    initialColumns
  );

  const subTitle = [
    "January - March",
    "April - June",
    "July - September",
    "October - Desember",
  ];

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedColumns = { ...columns };
    const sourceColumn = updatedColumns[source.droppableId];
    const destColumn = updatedColumns[destination.droppableId];

    // If the source and destination columns are the same
    if (source.droppableId === destination.droppableId) {
      const newItems = [...sourceColumn.items];
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
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
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
                  {column.items.map((item, index) => (
                    <TaskCard
                      key={item.id.toString()}
                      item={item}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              </Box>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanContainer;
