import axios from "../axios";

const getAllTag = () => {
  return axios.get("/tags/all");
};

const getTagSearch = (keyword) => {
  return axios.get("/tags/search", {
    params: { keyword: keyword },
  });
};

const isExist = (tagName) => {
  return axios.get(`/tags/exist`, {
    params: { name: tagName },
  });
};

const createTag = (body) => {
  return axios.post("/tags", body);
};

export { getAllTag, getTagSearch, isExist, createTag };
