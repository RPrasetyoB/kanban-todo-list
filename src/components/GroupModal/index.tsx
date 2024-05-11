/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, Typography } from "@mui/material";
import { createNewGroup } from "../../utils/fetchApi";
import { LoadingButton } from "@mui/lab";
import AlertBar from "../Alert";
import { PublicData } from "../../utils/globalStateProvider";
import styles from "./groupModal.module.scss";

interface GroupModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

const AddGroupModal: React.FC<GroupModalProps> = ({ open, setOpen }) => {
  const { setDataChanged } = React.useContext(PublicData);
  const [groupName, setGroupName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(0);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (value: React.FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    setIsSubmiting(true);
    try {
      const response = await createNewGroup({
        title: groupName,
        description: description,
      });
      if (response.ok) {
        setAlertModal(1);
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
          Create Group
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
              Group Name
            </Typography>
            <TextField
              hiddenLabel
              variant="outlined"
              aria-label="Group Name"
              name="groupName"
              onChange={handleGroupName}
              size="small"
              placeholder="Type new group name"
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
              Description
            </Typography>
            <TextField
              hiddenLabel
              aria-label="Description"
              name="description"
              size="small"
              placeholder="Type group description"
              onChange={handleDescription}
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
                  Save Group
                </Typography>
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {alertModal === 1 && (
        <AlertBar
          newState={{ vertical: "top", horizontal: "center" }}
          message={"Group added successfully"}
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

export default AddGroupModal;
