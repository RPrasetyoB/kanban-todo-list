import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/v1/login");
      }
    };
    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default AuthChecker;
