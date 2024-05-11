import { LoginContainer } from "../../containers";
import styles from "./login.module.scss";
import Box from "@mui/material/Box";

const LoginPage = () => {
  return (
    <Box className={styles.container}>
      <LoginContainer />
    </Box>
  );
};

export default LoginPage;
