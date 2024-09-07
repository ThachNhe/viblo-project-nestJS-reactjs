import axios from "../axios";

const createPost = (body) => {
  return axios.post("/posts", body);
};

const getPostById = (id) => {
  return axios.get(`/posts/${id}`);
};

const votePost = (body, id) => {
  return axios.post(`/posts/${id}/vote`, body);
};

export { createPost, getPostById, votePost };
