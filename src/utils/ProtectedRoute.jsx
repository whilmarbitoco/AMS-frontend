import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const [token, setToken] = useAuth();

  useEffect(() => {
    console.log("Token from auth: " + token);
  });

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
