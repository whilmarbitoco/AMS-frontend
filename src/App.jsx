import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./provider/AuthProvider";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ClassesPage from "./pages/ClassesPage";
import ClassPage from "./pages/ClassPage";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminStudent from "./pages/admin/AdminStudent";
import AttendancePage from "./pages/AttendancePage";
import ClassAttendancePage from "./pages/ClassAttendancePage";
import AttendanceNowPage from "./pages/AttendanceNowPae";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute userType="teacher" />}>
            <Route element={<DashboardPage />} path="/dashboard" />
            <Route element={<ProfilePage />} path="/dashboard/profile" />
            <Route element={<ClassesPage />} path="/dashboard/classes" />
            <Route element={<ClassPage />} path="/dashboard/class/:id" />
            <Route element={<AttendancePage />} path="/dashboard/attendance" />
            <Route
              element={<ClassAttendancePage />}
              path="/dashboard/attendance/:id"
            />
            <Route
              element={<AttendanceNowPage />}
              path="/dashboard/attendance/now"
            />
          </Route>

          <Route element={<ProtectedRoute userType="admin" />}>
            <Route element={<AdminDashboardPage />} path="/admin/dashboard" />
            <Route element={<AdminProfile />} path="/admin/profile" />
            <Route element={<AdminStudent />} path="/admin/students" />
          </Route>

          <Route element={<LoginPage />} path="/login" />
          <Route element={<SigninPage />} path="/signin" />
          <Route element={<HomePage />} path="/" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
