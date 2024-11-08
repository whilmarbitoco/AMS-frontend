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
    const verifyUser = async () => {
      if (token && Object.keys(user).length === 0) {
        try {
          const response = await fetch(`${api}/user/verify`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              auth: token,
            },
          });

          if (!response.ok) {
            setToken(null);
            localStorage.removeItem("token");
            navigate("/login");
          }

          const data = await response.json();
          setUser(data);

          if (data.type !== userType) {
            navigate("/");
          }
        } catch (error) {
          console.error("Error verifying user:", error);
          setToken(null);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else if (user.type !== userType) {
        navigate("/");
      }
    };

    verifyUser();
  }, [token, user, userType, api, navigate, setUser, setToken]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (Object.keys(user).length === 0) {
    return null; // Show nothing while verifying
  }

  return <Outlet />;
};

export default ProtectedRoute;
