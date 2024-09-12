import { Routes, Route, Navigate } from "react-router-dom";
import NewestPost from "../components/postNavbar/NewestPost";
import FollowingPost from "../components/user/PostPage/FollowingPost";
function PostRoute() {
  return (
    <Routes>
      <Route path="/newest" element={<NewestPost />} />
      <Route path="/followings" element={<FollowingPost />} />
    </Routes>
  );
}

export default PostRoute;
