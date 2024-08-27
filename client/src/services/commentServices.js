import axios from "../axios";

const createComment = (body) => {
  return axios.post("/comment", body);
};

const getCommentByPostId = (postId) => {
  return axios.get("/comment", {
    params: {
      postId: postId,
    },
  });
};

export { createComment, getCommentByPostId };
