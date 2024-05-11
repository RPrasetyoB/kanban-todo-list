/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Typography, CardContent } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import complete from "../../assets/Complete_Icon.svg";
import styles from "./taskCard.module.scss";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import DropMenu from "../DropMenu";
import { useState } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ value }) => ({
  height: 16,
  borderRadius: 10,
  width: "195px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 200,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: value === 100 ? "#43936c" : "#01959f",
  },
}));

const TaskCard: React.FC<CardProps> = ({ item, index, group }) => {
  const [drop, setDrop] = useState<null | HTMLElement>(null);
  const [cardId, setCardId] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const totalSections = 60;
  const lineWidthPercentage = 2;
  const blankWidthPercentage = (100 - lineWidthPercentage) / (totalSections - 1);

  const sections: any = [];
  for (let i = 0; i < totalSections; i++) {
    sections.push(
      <div
        key={i}
        className={styles[i % 2 === 0 ? "line" : "blank"]}
        style={{
          width: `${i % 2 === 0 ? lineWidthPercentage : blankWidthPercentage}%`,
        }}
      />
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDrop(event.currentTarget);
    setCardId(item.id);
    setGroupId(group);
    setItemName(item.name);
  };

  return (
    <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
      {provided => (
        <Box
          className={styles.cardContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className={styles.card}>
            <CardContent className={styles.content}>
              <Box className={styles.title}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    fontFamily: "Nunito Sans, sans-serif",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
              <Box className={styles.divider}>{sections}</Box>
              <Box className={styles.status}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BorderLinearProgress variant="determinate" value={item.progress_percentage} />
                  {item.progress_percentage === null && (
                    <Typography sx={{ fontSize: "12px", marginLeft: "8px" }}>0%</Typography>
                  )}
                  {item.progress_percentage !== 100 && item.progress_percentage !== null && (
                    <Typography sx={{ fontSize: "12px", marginLeft: "8px" }}>
                      {item.progress_percentage + "%"}
                    </Typography>
                  )}
                  {item.progress_percentage === 100 && (
                    <img src={complete} alt="complete icon" style={{ width: "16px", marginLeft: "8px" }} />
                  )}
                </Box>
                <Box component="button" onClick={handleClick} sx={{ background: "transparent", border: "none" }}>
                  <MoreHorizIcon sx={{ width: "22px", color: "#757575" }} />
                </Box>
                <DropMenu groupId={groupId} taskId={cardId} drop={drop} setDrop={setDrop} itemName={itemName} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
export default TaskCard;
