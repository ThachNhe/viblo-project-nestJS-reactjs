// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";
import toast from "react-hot-toast";
export const getPostById = (id) => {
  return async (dispatch) => {
    try {
      const post = await services.getPostById(id);
      console.log("Post from get post!!!:", post);
      dispatch({
        type: actionType.GET_POST_ID_SUCCESS,
        payload: post,
      });
    } catch (error) {
      console.error("Err from get post!!!:", error);
      // toast.error("Login information is not correct!!");
      dispatch({
        type: actionType.GET_POST_ID_FAILED,
        payload: null,
      });
    }
  };
};
