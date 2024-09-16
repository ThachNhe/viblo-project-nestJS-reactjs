// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";
import toast from "react-hot-toast";
export const getCommentByPostId = (id) => {
  return async (dispatch) => {
    try {
      const comments = await services.getCommentByPostId(id);
      dispatch({
        type: actionType.GET_COMMENT_BY_POST_ID_SUCCESS,
        payload: comments,
      });
    } catch (error) {
      console.error("Err from get comment by postId!!!:", error);
      dispatch({
        type: actionType.GET_COMMENT_BY_POST_ID_FAILED,
        payload: null,
      });
    }
  };
};
