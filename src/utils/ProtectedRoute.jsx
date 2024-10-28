import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";
import { userStore } from "../store/userStore";
import { useAtom } from "jotai";

const ProtectedRoute = () => {
  const [token, setToken] = useAuth();
  const [user, setUser] = useAtom(userStore);

  useEffect(() => {
    if (token) {
      setUser({
        name: "John Auth",
        email: "john@doe.com",
        password: "123456",
      });
    }
  }, []);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
