import axios from "../axios";

const getUsers = () => {
  return axios.get("/users");
};
const userLoginService = (body) => {
  return axios.post("/auth/login", body);
};
const userRegisterService = (body) => {
  return axios.post("/auth/register", body);
};

const userLogoutService = () => {
  return axios.post("/auth/logout");
};

export { getUsers, userLoginService, userRegisterService, userLogoutService };
