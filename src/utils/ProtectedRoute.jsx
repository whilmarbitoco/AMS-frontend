import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";
import { userStore } from "../store/userStore";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";

const ProtectedRoute = ({ userType }) => {
  const [token, setToken] = useAuth();
  const [user, setUser] = useAtom(userStore);
  const navigate = useNavigate();
  const [api, setApi] = useAtom(apiStore);

  useEffect(() => {
    if (token && Object.keys(user).length === 0) {
      fetch(`${api}/user/verify`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          setUser(data);
        });
    } else if (user.type != userType) {
      navigate("/");
    }
  }, [user]);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
