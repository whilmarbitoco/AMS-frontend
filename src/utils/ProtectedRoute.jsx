import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProtectedRoute = () => {
  const [user, setUser] = useUserContext();
  const [login, setLogin] = useState(false);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
