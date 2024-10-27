import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProtectedRoute = () => {
  const [user, setUser] = useUserContext();
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  // Note: check for token in local storage and set user
  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }

    if (getToken() && !user) {
      setUser({
        name: "John Doe",
        email: "john@doe.com",
        password: "12345678",
      });
    }
  }, [user]);

  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
