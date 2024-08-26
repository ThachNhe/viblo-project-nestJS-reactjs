import axios from "../axios";

const createPost = (body) => {
  return axios.post("post", body);
};

export { createPost };
