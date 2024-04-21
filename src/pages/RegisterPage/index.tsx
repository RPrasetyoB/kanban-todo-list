import Box from "@mui/material/Box";
import { RegisterContainer } from "../../containers";
import styles from "./register.module.scss";
const RegisterPage = () => {
  return (
    <Box className={styles.container}>
      <RegisterContainer />
    </Box>
  );
};

export default RegisterPage;
