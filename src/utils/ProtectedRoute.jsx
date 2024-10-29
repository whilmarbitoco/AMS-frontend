import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";
import { userStore } from "../store/userStore";
import { useAtom } from "jotai";

const ProtectedRoute = ({ userType }) => {
  const [token, setToken] = useAuth();
  const [user, setUser] = useAtom(userStore);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && Object.keys(user).length === 0) {
      setUser({
        username: "John Auth",
        email: "john@doe.com",
        type: "teacher",
        password: "123456",
      });

      if (user.type != userType) {
        navigate("/");
      }
    }
  }, [user]);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
