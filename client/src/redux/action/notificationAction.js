// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";

export const getUsersNotifications = () => {
  return async (dispatch) => {
    try {
      const notifications = await services.getUserNotifications();
      dispatch({
        type: actionType.GET_USER_NOTIFICATION_SUCCESS,
        payload: notifications,
      });
    } catch (error) {
      console.error("Err from get tags!!!:", error);
      dispatch({
        type: actionType.GET_USER_NOTIFICATION_FAILED,
        payload: null,
      });
    }
  };
};
