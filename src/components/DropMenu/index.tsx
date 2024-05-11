/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styles from "./dropMenu.module.scss";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BiEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { updateTask } from "../../utils/fetchApi";
import { PublicData } from "../../utils/globalStateProvider";

interface DropMenuProps {
  groupId: string;
  taskId: string;
  drop: HTMLElement | null;
  setDrop: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  itemName: any;
}

const DropMenu: React.FC<DropMenuProps> = ({ groupId, taskId, drop, setDrop, itemName }) => {
  const { setDataChanged } = React.useContext(PublicData);
  const open = Boolean(drop);
  const handleRight = async () => {
    try {
      const response = await updateTask(
        {
          target_todo_id: Number(taskId) + 1,
          name: itemName,
        },
        groupId,
        taskId
      );
      if (response.ok) {
        setDrop(null);
        setDataChanged(prev => !prev);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleLeft = async () => {
    try {
      const response = await updateTask(
        {
          target_todo_id: Number(taskId) - 1,
          name: itemName,
        },
        groupId,
        taskId
      );
      if (response.ok) {
        setDrop(null);
        setDataChanged(prev => !prev);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setDrop(null);
  };

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={drop}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        slotProps={{
          paper: {
            sx: {
              padding: "0 80x",
              minWidth: "320px",
              minHeight: "160px",
              borderRadius: "8px",
            },
          },
        }}
      >
        <MenuItem onClick={handleRight} className={styles.menuList}>
          <ArrowForwardIcon className={styles.update} sx={{ width: "20px" }} />
          <Typography
            className={styles.update}
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            Move Right
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLeft} className={styles.menuList}>
          <ArrowBackIcon className={styles.update} sx={{ width: "20px" }} />
          <Typography
            className={styles.update}
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            Move Left
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuList}>
          <BiEditAlt className={styles.update} size="big" style={{ width: "20px" }} />
          <Typography
            className={styles.update}
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuList}>
          <FaRegTrashAlt className={styles.delete} style={{ width: "20px" }} />
          <Typography
            className={styles.delete}
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "Nunito Sans, sans-serif",
            }}
          >
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropMenu;
