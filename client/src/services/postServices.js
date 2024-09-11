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

const bookmark = (postId) => {
  return axios.post(`/posts/${postId}/bookmark`);
};

const unbookmark = (postId) => {
  return axios.delete(`/posts/${postId}/bookmark`);
};

const getPaginationPosts = (page = 1, limit = 10) => {
  return axios.get(`/posts?page=${page}&limit=${limit}`);
};

export {
  createPost,
  getPostById,
  votePost,
  bookmark,
  unbookmark,
  getPaginationPosts,
};
