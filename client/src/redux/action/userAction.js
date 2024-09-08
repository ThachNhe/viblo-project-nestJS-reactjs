// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";
import toast from "react-hot-toast";
export const userLogin = (body) => {
  return async (dispatch) => {
    try {
      const users = await services.userLoginService(body);
      if (users.success) {
        toast.success("Login success!!!");
      }
      dispatch({
        type: actionType.USER_LOGIN_SUCCESS,
        payload: users,
      });
    } catch (error) {
      console.error("Err from user Login!!!:", error);
      toast.error("Login information is not correct!!");
      dispatch({
        type: actionType.USER_LOGIN_FAILURE,
        payload: error,
      });
    }
  };
};

export const userRegister = (body) => {
  return async (dispatch) => {
    try {
      const res = await services.userRegisterService(body);
      dispatch({
        type: actionType.USER_REGISTER_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: actionType.USER_REGISTER_FAILURE,
        payload: error,
      });
    }
  };
};

export const getAllUserAction = () => {
  return async (dispatch) => {
    try {
      const users = await services.getUsers();
      dispatch({
        type: actionType.GET_ALL_USER,
        payload: users,
      });
    } catch (error) {
      console.error("err from get all users:", error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const users = await services.userLogoutService();
      console.log("come here!!");
      dispatch({
        type: actionType.USER_LOGOUT_SUCCESS,
        payload: null,
      });
    } catch (error) {
      console.error("Err from user logout:", error);
      dispatch({
        type: actionType.USER_LOGOUT_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateAvatar = (avatarUrl) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionType.UPDATE_USER_AVATAR,
        payload: avatarUrl,
      });
    } catch (error) {
      console.error("Err from user logout:", error);
    }
  };
};
