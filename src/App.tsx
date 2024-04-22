import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Dashboard, LoginPage, RegisterPage } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/v1" />} />
          <Route path="/v1" element={<Dashboard />} />
          <Route path="/v1/login" element={<LoginPage />} />
          <Route path="/v1/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
