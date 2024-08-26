import axios from "../axios";

const createPost = (body) => {
  return axios.get("/tag/all", body);
};

export { getAllTag };
