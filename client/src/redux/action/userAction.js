// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";

export const userLogin = (body) => {
  return async (dispatch) => {
    try {
      const users = await services.userLoginService(body);
      dispatch({
        type: actionType.USER_LOGIN_SUCCESS,
        payload: users,
      });
    } catch (error) {
      console.error("Err from user Login!!!:", error);
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
      console.error("err from user register!!!:", error);
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
