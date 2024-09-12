import { Routes, Route, Navigate } from "react-router-dom";
import ForgetPassword from "../components/auth/ForgetPassword";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Homepage from "../components/user/Homepage/HomePage";
import PublishPost from "../components/user/PublishPost";
import Following from "../components/postNavbar/Following";
import NewestPost from "../components/postNavbar/NewestPost";
import TrendingPost from "../components/postNavbar/TrendingPost";
import MyBookmark from "../components/postNavbar/MyBookmark";
import AdminApp from "../components/admin/AdminApp";

function AppRoutes() {
  return (
    <Routes>
      {/* <Route element={<AdminRoute />}>
        <Route path="/admin/*" element={<AdminApp />} />
      </Route> */}
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/followings" element={<Following />} />
      <Route path="/questions" element={<Following />} />
      <Route path="/trending" element={<TrendingPost />} />
      <Route path="/clip/posts" element={<MyBookmark />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route exact path="/publish/post" element={<PrivateRoute />}>
        <Route path="/publish/post" element={<PublishPost />} />
      </Route>
      <Route path="/newest" element={<NewestPost />} />
      {/* <Route path="*" element={<Navigate to="/homepage" />} /> */}
    </Routes>
  );
}

export default AppRoutes;
