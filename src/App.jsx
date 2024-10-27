import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardPage />} path="/dashboard" />
          </Route>
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
