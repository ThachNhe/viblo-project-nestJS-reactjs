import { Routes, Route, Navigate } from "react-router-dom";
import NewestPost from "../components/postNavbar/NewestPost";
import Following from "../components/postNavbar/Following";

function PostRoute() {
  return (
    <Routes>
      <Route path="/newest" element={<NewestPost />} />
      <Route path="/followings" element={<Following />} />
    </Routes>
  );
}

export default PostRoute;
