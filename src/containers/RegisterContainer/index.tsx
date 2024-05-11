/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./register.module.scss";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { registerUser } from "../../utils/fetchApi";
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

const RegisterContainer = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameHelper, setNameHelper] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [confirmPassHelper, setConfirmPassHelper] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [alertModal, setAlertModal] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 3) {
      setNameError(true);
      setNameHelper("Name must be at least 3 characters long");
    } else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
      setNameError(true);
      setNameHelper("Name must contain only letters and spaces");
    } else {
      setNameError(false);
      setNameHelper("");
    }
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setConfirmPassword("");
    if (e.target.value.length < 3) {
      setPasswordError(true);
      setPasswordHelper("Password must be at least 3 characters long");
    } else {
      setPasswordError(false);
      setPasswordHelper("");
    }
  };
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPassError(true);
      setConfirmPassHelper("Password Confirmation not match");
    } else {
      setConfirmPassError(false);
      setConfirmPassHelper("");
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  const handleSubmit = async (value: React.FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    setAlertModal(0);
    setIsSubmiting(true);
    try {
      const response = await registerUser({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      if (response.ok) {
        setIsSubmited(true);
        setAlertModal(1);
        setTimeout(() => {
          navigate("/v1/login");
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
        label="Name"
        value={name}
        onChange={handleNameChange}
        error={nameError}
        helperText={nameHelper}
        sx={formStyle}
      />
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
        error={passwordError}
        helperText={passwordHelper}
        inputProps={{
          type: "password",
        }}
        sx={formStyle}
      />
      <TextField
        fullWidth
        required
        label="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPassword}
        error={confirmPassError}
        helperText={confirmPassHelper}
        inputProps={{
          type: "password",
        }}
        sx={formStyle}
      />
      <Typography className={styles.question}>
        Already have an account? <Link to={"/v1/login"}>Log in</Link>
      </Typography>
      <LoadingButton
        className={styles.button}
        loading={isSubmiting}
        variant="contained"
        color="primary"
        type="submit"
        disabled={!name || !email || nameError || emailError || isSubmited}
      >
        Submit
      </LoadingButton>
      {alertModal === 1 && (
        <AlertBar
          newState={{ vertical: "top", horizontal: "center" }}
          message={"User registered successfully"}
          severity="success"
        />
      )}
      {alertModal === 2 && (
        <AlertBar
          newState={{ vertical: "top", horizontal: "center" }}
          message={"Registration failed " + alertMessage}
          severity="error"
        />
      )}
    </Box>
  );
};

export default RegisterContainer;
