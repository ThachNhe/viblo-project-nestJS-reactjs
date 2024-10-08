import { Routes, Route, Navigate, Redirect } from "react-router-dom";
import ForgetPassword from "../components/auth/ForgetPassword";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import PostDetail from "../components/user/Homepage/PostDetail";
import PublishPost from "../components/user/PublishPost";
import NewestPost from "../components/postNavbar/NewestPost";
import TrendingPost from "../components/postNavbar/TrendingPost";
import MyBookmark from "../components/postNavbar/MyBookmark";
import AdminApp from "../components/admin/AdminApp";
import PostPageLayout from "../components/layouts/PostPageLayout";
import FollowingPost from "../components/user/PostPage/FollowingPost";
import ResetPassword from "../components/auth/ResetPassword";
import UserBlog from "../components/user/UserBlog";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route path="/admin/*" element={<AdminApp />} />
      </Route>

      <Route path="/p/:slug" element={<PostDetail />} />
      <Route path="/" element={<Navigate to="/followings" />} />
      <Route path="/user/:userName" element={<UserBlog />} />
      <Route path="/" element={<PostPageLayout />}>
        <Route index path="followings" element={<FollowingPost />} />
        <Route path="newest" element={<NewestPost />} />
      </Route>

      <Route path="/trending" element={<TrendingPost />} />
      <Route path="/clip/posts" element={<MyBookmark />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route exact path="/publish/post" element={<PrivateRoute />}>
        <Route path="/publish/post" element={<PublishPost />} />
      </Route>
      <Route path="/newest" element={<NewestPost />} />
      <Route path="*" element={<Navigate to="/followings" />} />
    </Routes>
  );
}

export default AppRoutes;
