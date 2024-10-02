import axios from "axios";
import { store } from "./redux/store";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] =
      "bearer " + store.getState()?.auth?.userInfo?.accessToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  // Thrown error for request with OK status code
  const { data } = response;
  return response.data;
});

export default instance;
