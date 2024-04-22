/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Typography, CardContent } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./taskCard.module.scss";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface CardProps {
  item: any;
  index: any;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 16,
  borderRadius: 10,
  width: "216px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: value === 100 ? "#01959f" : "#43936c",
  },
}));

const TaskCard: React.FC<CardProps> = ({ item, index }) => {
  const totalSections = 60;
  const lineWidthPercentage = 2;
  const blankWidthPercentage =
    (100 - lineWidthPercentage) / (totalSections - 1);

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
  return (
    <Draggable
      key={item.id.toString()}
      draggableId={item.id.toString()}
      index={index}
    >
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
                <Box sx={{ display: "flex" }}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={item.progress_percentage}
                  />
                  {item.progress_percentage === null && (
                    <Typography sx={{ fontSize: "12px", marginLeft: "10px" }}>
                      0%
                    </Typography>
                  )}
                  {item.progress_percentage !== 100 &&
                    item.progress_percentage !== null && (
                      <Typography sx={{ fontSize: "12px", marginLeft: "10px" }}>
                        {item.progress_percentage + "%"}
                      </Typography>
                    )}
                  {item.progress_percentage === 100 && (
                    <CheckCircleIcon
                      sx={{ color: "green", bgcolor: "white" }}
                    />
                  )}
                </Box>
                <MoreHorizIcon sx={{ width: "24px", color: "#757575" }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
export default TaskCard;
