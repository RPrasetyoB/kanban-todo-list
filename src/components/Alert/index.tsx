/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface State extends SnackbarOrigin {
  open: boolean;
}

interface AlertBarProps {
  newState: SnackbarOrigin;
  message: string;
  severity?: AlertProps["severity"];
}

const AlertBar: React.FC<AlertBarProps> = ({ newState, message, severity }) => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...newState,
      open: true,
    }));
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [newState]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ width: "auto" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AlertBar;
