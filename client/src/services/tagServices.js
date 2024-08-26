import axios from "../axios";

const getAllTag = () => {
  return axios.get("/tag/all");
};

export { getAllTag };
