import { RegisterContainer } from "../../containers";
import styles from "./register.module.scss";
import Box from "@mui/material/Box";
const RegisterPage = () => {
  return (
    <Box className={styles.container}>
      <RegisterContainer />
    </Box>
  );
};

export default RegisterPage;
