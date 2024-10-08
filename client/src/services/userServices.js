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

const blockUser = (userId) => {
  return axios.put(`/users/${userId}/block`);
};

const unblockUser = (userId) => {
  return axios.put(`/users/${userId}/unblock`);
};

const getTopAuthors = (page, limit) => {
  return axios.get(`/users/top?page=${page}&limit=${limit}`);
};

const forgotPassword = (body) => {
  return axios.post("/auth/forgot-password", body);
};

const resetPassword = (body) => {
  return axios.post("/auth/reset-password", body);
};

const saveNotificationToken = (body) => {
  return axios.put("/users/save-notification-token", body);
};

const getProfile = (userName) => {
  return axios.get(`/users/details/${userName}`);
};

const getRefreshToken = () => {
  return axios.post("/auth/refresh-token", {});
};

export {
  userLoginService,
  userRegisterService,
  userLogoutService,
  uploadAvatar,
  getPaginationUsers,
  blockUser,
  unblockUser,
  getTopAuthors,
  forgotPassword,
  resetPassword,
  saveNotificationToken,
  getProfile,
  getRefreshToken,
};
