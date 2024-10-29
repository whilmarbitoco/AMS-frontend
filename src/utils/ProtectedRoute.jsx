import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";
import { userStore } from "../store/userStore";
import { useAtom } from "jotai";

const ProtectedRoute = () => {
  const [token, setToken] = useAuth();
  const [user, setUser] = useAtom(userStore);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("whatt: " + user.username);

    if (token && Object.keys(user).length === 0) {
      setUser({
        username: "John Auth",
        email: "john@doe.com",
        password: "123456",
      });

      console.log(user);
    }
  }, []);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
