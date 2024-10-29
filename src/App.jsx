import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./provider/AuthProvider";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute userType="teacher" />}>
            <Route element={<DashboardPage />} path="/dashboard" />
          </Route>

          <Route element={<ProtectedRoute userType="admin" />}>
            <Route element={<AdminDashboardPage />} path="/admin/dashboard" />
          </Route>

          <Route element={<LoginPage />} path="/login" />
          <Route element={<SigninPage />} path="/signin" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
