/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./login.module.scss";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { loginUser } from "../../utils/fetchApi";
import { Link, useNavigate } from "react-router-dom";
import { AlertBar } from "../../components";
import Box from "@mui/material/Box";

const formStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#000",
    fontFamily: "Arial",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#01959f !important",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-outlined": {
    color: "#01959f !important",
  },
};

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [alertModal, setAlertModal] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (value: React.FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    setAlertModal(0);
    setIsSubmiting(true);
    try {
      const response = await loginUser({
        email,
        password,
      });
      if (response?.ok) {
        const data = await response.json();
        localStorage.setItem("auth_token", data.data.token);
        setIsSubmited(true);
        setAlertModal(1);
        setTimeout(() => {
          navigate("/v1");
        }, 2000);
      }
    } catch (error: any) {
      console.error(error);
      setAlertModal(2);
      setIsSubmiting(false);
      setAlertMessage(error.toString());
    }
  };

  return (
    <Box className={styles.container} component="form" onSubmit={handleSubmit}>
      <Typography className={styles.title}>Login Form</Typography>
      <TextField
        fullWidth
        required
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        helperText={emailError ? "Please enter a valid email" : ""}
        inputProps={{
          type: "email",
        }}
        sx={formStyle}
      />
      <TextField
        fullWidth
        required
        label="Password"
        value={password}
        onChange={handlePassword}
        inputProps={{
          type: "password",
        }}
        sx={formStyle}
      />
      <Typography className={styles.question}>
        Dont have account? <Link to={"/v1/register"}>Register</Link>
      </Typography>
      <LoadingButton
        className={styles.button}
        loading={isSubmiting}
        variant="contained"
        color="primary"
        type="submit"
        disabled={!email || !password || emailError || isSubmited}
      >
        Submit
      </LoadingButton>
      {alertModal === 1 && (
        <AlertBar
          newState={{ vertical: "top", horizontal: "center" }}
          message={"User logged in successfully"}
          severity="success"
        />
      )}
      {alertModal === 2 && (
        <AlertBar
          newState={{ vertical: "top", horizontal: "center" }}
          message={"Login failed " + alertMessage}
          severity="error"
        />
      )}
    </Box>
  );
};

export default LoginContainer;
