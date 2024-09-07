import axios from "../axios";

const createComment = (body) => {
  return axios.post("/comments", body);
};

const getCommentByPostId = (postId) => {
  return axios.get(`/comments/${postId}`);
};

export { createComment, getCommentByPostId };
