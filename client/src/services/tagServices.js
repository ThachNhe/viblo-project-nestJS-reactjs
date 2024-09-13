import axios from "../axios";

const getAllTag = () => {
  return axios.get("/tags/all");
};

const getTagSearch = (keyword) => {
  return axios.get("/tags/search", {
    params: { keyword: keyword },
  });
};

export { getAllTag, getTagSearch };
