import styles from "./dashboard.module.scss";
import Box from "@mui/material/Box";
import { HeadingContainer, KanbanContainer } from "../../containers";
import AuthChecker from "../../utils/authChecker";

const Dashboard = () => {
  AuthChecker();
  return (
    <Box className={styles.container}>
      <HeadingContainer />
      <KanbanContainer />
    </Box>
  );
};

export default Dashboard;
