import axios from "../axios";

const getTagStatistic = () => {
  return axios.get("/statistics/tags");
};

const getCommonStatistic = () => {
  return axios.get("/statistics/common");
};
export { getTagStatistic, getCommonStatistic };
