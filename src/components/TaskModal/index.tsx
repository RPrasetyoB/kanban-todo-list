/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, Typography } from "@mui/material";
import { createNewTask } from "../../utils/fetchApi";
import { LoadingButton } from "@mui/lab";
import AlertBar from "../Alert";
import { PublicData } from "../../utils/globalStateProvider";
import styles from "./taskModal.module.scss";

interface GroupModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  column: number;
}

const formStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#000",
    fontSize: "12px",
    fontFamily: "Nunito Sans, sans-serif",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#dedede !important",
      borderWidth: "1px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#01959f !important",
      borderWidth: "2px",
    },
  },
};

const AddTaskModal: React.FC<GroupModalProps> = ({ open, setOpen, column }) => {
  const { setDataChanged } = React.useContext(PublicData);
  const [taskName, setTaskName] = React.useState("");
  const [percentage, setPercentage] = React.useState(0);
  const [inputPercentage, setInputPercentage] = React.useState("");
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(0);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handlePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^(\d{0,2}|100)%?$/; // Adjusted regex pattern to allow up to 3 digits and 100
    if (regex.test(value)) {
      setInputPercentage(value);
      const numericValue = parseFloat(value.replace("%", ""));
      setPercentage(isNaN(numericValue) ? 0 : Math.min(100, numericValue)); // Ensure the value is between 0 and 100
    }
  };

  const handleSubmit = async (value: React.FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    setIsSubmiting(true);
    try {
      const response = await createNewTask(
        {
          name: taskName,
          progress_percentage: percentage,
        },
        column
      );
      if (response.ok) {
        setAlertModal(1);
        setTimeout(() => {
          setAlertModal(0);
        }, 2000);
        setOpen(false);
        setIsSubmiting(false);
        setDataChanged(prev => !prev);
      }
    } catch (error: any) {
      console.error(error);
      setAlertModal(2);
      setIsSubmiting(false);
      setAlertMessage(error.toString());
    }
  };

  return (
    <React.Fragment>
      <Dialog
        className={styles.container}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "420px",
              borderRadius: "10px",
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: 700,
            fontSize: "18px",
            fontFamily: "Nunito Sans, sans-serif",
            padding: "24px",
          }}
        >
          Create Task
        </DialogTitle>
        <DialogContent sx={{ padding: "24px" }}>
          <Box component="form" onSubmit={handleSubmit} className={styles.form}>
            <Typography
              className={styles.title}
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                fontFamily: "Nunito Sans, sans-serif",
              }}
            >
              Task Name
            </Typography>
            <TextField
              hiddenLabel
              aria-label="Task Name"
              name="taskName"
              onChange={handleTaskName}
              size="small"
              placeholder="Type your task"
              sx={formStyle}
              inputProps={{
                style: {
                  height: "36px",
                  padding: "0 16px",
                  fontSize: "12px",
                },
              }}
              fullWidth
            />
            <Typography
              className={styles.title}
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                fontFamily: "Nunito Sans, sans-serif",
              }}
            >
              Progress
            </Typography>
            <TextField
              hiddenLabel
              aria-label="Progress"
              name="progress"
              size="small"
              placeholder="70%"
              onChange={handlePercentage}
              value={inputPercentage}
              sx={[formStyle, { width: "143px" }]}
              inputProps={{
                style: {
                  height: "36px",
                  padding: "0 16px",
                  fontSize: "12px",
                },
              }}
            />
            <Box className={styles.buttons}>
              <button
                onClick={handleClose}
                className={styles.cancel}
                type="button"
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    fontFamily: "Nunito Sans, sans-serif",
                  }}
                >
                  Cancel
                </Typography>
              </button>
              <LoadingButton
                type="submit"
                autoFocus
                loading={isSubmiting}
                className={styles.submit}
                sx={{ textTransform: "none" }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    fontFamily: "Nunito Sans, sans-serif",
                    color: "white",
                  }}
                >
                  Save Task
                </Typography>
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {alertModal === 1 && (
        <AlertBar
          newState={{ vertical: "top", horizontal: "center" }}
          message={"Task added successfully"}
          severity="success"
        />
      )}
      {alertModal === 2 && (
        <AlertBar
          newState={{ vertical: "top", horizontal: "center" }}
          message={"Failed add new group " + alertMessage}
          severity="error"
        />
      )}
    </React.Fragment>
  );
};

export default AddTaskModal;
