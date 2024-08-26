import axios from "../axios";

const createPost = (body) => {
  return axios.post("/post", body);
};

const getPostById = (id) => {
  return axios.get("/post", {
    params: {
      id: id,
    },
  });
};

export { createPost, getPostById };
