import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ForgetPassword from "../hooks/auth/ForgetPassword";
import Register from "../hooks/auth/Register";
import Login from "../hooks/auth/Login";
import AdminDashboard from "../hooks/admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import HomePage from "../hooks/user/HomePage";
import { useSelector } from "react-redux";
function AppRoutes() {
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  return (
    <Routes>
      {/* {isLogin && userInfo?.data.user.roles === "ADMIN" && (
       
      )} */}
      <Route exact path="/admin" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
