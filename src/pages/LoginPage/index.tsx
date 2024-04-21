import Box from "@mui/material/Box";
import { LoginContainer } from "../../containers";
import styles from "./login.module.scss";

const LoginPage = () => {
  return (
    <Box className={styles.container}>
      <LoginContainer />
    </Box>
  );
};

export default LoginPage;
