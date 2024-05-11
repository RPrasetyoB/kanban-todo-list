import { Typography } from "@mui/material";
import plusIcon from "../../assets/plus.svg";
import styles from "./heading.module.scss";
import Box from "@mui/material/Box";
import { AddGroupModal } from "../../components";
import { useState } from "react";

const HeadingContainer = () => {
  const [addGroupModal, setAddgroupModal] = useState(false);
  return (
    <Box className={styles.container}>
      <Typography
        sx={{
          fontSize: "18px",
          fontFamily: "Nunito Sans, sans-serif",
          fontWeight: 700,
          lineHeight: "28px",
        }}
      >
        Product Roadmap
      </Typography>
      <button className={styles.button} onClick={() => setAddgroupModal(true)}>
        <img src={plusIcon} alt="plus icon" style={{ width: "10px" }} />
        <Typography
          sx={{
            fontSize: "12px",
            fontFamily: "Nunito Sans, sans-serif",
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          Add New Group
        </Typography>
      </button>
      <AddGroupModal open={addGroupModal} setOpen={setAddgroupModal} />
    </Box>
  );
};

export default HeadingContainer;
