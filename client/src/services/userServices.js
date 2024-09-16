import axios from "../axios";

const userLoginService = (body) => {
  return axios.post("/auth/login", body);
};
const userRegisterService = (body) => {
  return axios.post("/auth/register", body);
};

const userLogoutService = () => {
  return axios.post("/auth/logout");
};

const uploadAvatar = (body) => {
  return axios.put("/users/avatar", body);
};

const getPaginationUsers = (page, limit) => {
  return axios.get(`/users?page=${page}&limit=${limit}`);
};

export {
  userLoginService,
  userRegisterService,
  userLogoutService,
  uploadAvatar,
  getPaginationUsers,
};
