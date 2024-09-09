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
import PublishPost from "../hooks/user/PublishPost";
import Following from "../hooks/user/Following";
function AppRoutes() {
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  return (
    <Routes>
      <Route exact path="/admin" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/" element={<HomePage />} />
      <Route path="/followings" element={<Following />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route exact path="/publish/post" element={<PrivateRoute />}>
        <Route path="/publish/post" element={<PublishPost />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
