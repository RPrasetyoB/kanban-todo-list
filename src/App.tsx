import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Dashboard, LoginPage, RegisterPage } from "./pages";
import GlobalState from "./utils/globalStateProvider";

function App() {
  return (
    <GlobalState>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/v1" />} />
          <Route path="/v1" element={<Dashboard />} />
          <Route path="/v1/login" element={<LoginPage />} />
          <Route path="/v1/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </GlobalState>
  );
}

export default App;
