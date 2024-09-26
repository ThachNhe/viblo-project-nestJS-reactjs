// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";
import toast from "react-hot-toast";

export const getPostById = (id) => {
  return async (dispatch) => {
    try {
      const post = await services.getPostById(id);
      dispatch({
        type: actionType.GET_POST_ID_SUCCESS,
        payload: post,
      });
    } catch (error) {
      console.error("Err from get post!!!:", error);
      dispatch({
        type: actionType.GET_POST_ID_FAILED,
        payload: null,
      });
    }
  };
};

export const getPostBySlug = (slug) => {
  return async (dispatch) => {
    try {
      const post = await services.getPostBySlug(slug);
      dispatch({
        type: actionType.GET_POST_BY_SLUG_SUCCESS,
        payload: post,
      });
    } catch (error) {
      console.error("Err from get post!!!:", error);
      dispatch({
        type: actionType.GET_POST_BY_SLUG_FAILED,
        payload: null,
      });
    }
  };
};

export const getPaginationPosts = (page, limit) => {
  return async (dispatch) => {
    try {
      const posts = await services.getPaginationPosts(page, limit);
      dispatch({
        type: actionType.GET_POST_PAGINATION_SUCCESS,
        payload: posts,
      });
    } catch (error) {
      console.error("Err from get post pagination!!!:", error);
      dispatch({
        type: actionType.GET_POST_PAGINATION_FAILED,
        payload: null,
      });
    }
  };
};

export const getRelatedPosts = (postId) => {
  return async (dispatch) => {
    try {
      const posts = await services.getRelatedPosts(postId);
      dispatch({
        type: actionType.GET_RELATED_POST_SUCCESS,
        payload: posts,
      });
    } catch (error) {
      console.error("Err from get post pagination!!!:", error);
      dispatch({
        type: actionType.GET_RELATED_POST_FAILED,
        payload: null,
      });
    }
  };
};
