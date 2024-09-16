// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";
import toast from "react-hot-toast";
export const getAllTag = () => {
  return async (dispatch) => {
    try {
      const tags = await services.getAllTag();
      dispatch({
        type: actionType.GET_TAGS_SUCCESS,
        payload: tags,
      });
    } catch (error) {
      console.error("Err from get tags!!!:", error);
      dispatch({
        type: actionType.GET_TAGS_FAILURE,
        payload: null,
      });
    }
  };
};
