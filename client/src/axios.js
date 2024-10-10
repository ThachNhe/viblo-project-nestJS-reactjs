import axios from "axios";
import { store } from "./redux/store";
import * as actions from "./redux/action/index";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => config,
  // (config) => {
  //   config.headers["Authorization"] =
  //     "bearer " + store.getState()?.auth?.userInfo?.accessToken;
  //   return config;
  // },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // store.dispatch(actions.getRefreshToken());
      } catch (refreshError) {
        console.log("refreshError", refreshError);
        // if (refreshError.response.status === 500) {
        //   // store.dispatch(actions.logout());
        //   return Promise.reject(refreshError);
        // }
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 500) {
      store.dispatch(actions.logout());
    }
    return Promise.reject(error);
  }
);

export default instance;
