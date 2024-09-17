// Action Creators
import actionType from "./actionType";
import * as services from "../../services/index";

export const tagStatistic = () => {
  return async (dispatch) => {
    try {
      const tagStatistic = await services.getTagStatistic();
      dispatch({
        type: actionType.GET_TAG_STATISTIC_SUCCESS,
        payload: tagStatistic,
      });
    } catch (error) {
      console.error("Err from get tag statistic!:", error);
      dispatch({
        type: actionType.GET_TAG_STATISTIC_FAILED,
        payload: null,
      });
    }
  };
};

export const commonStatistic = () => {
  return async (dispatch) => {
    try {
      const statistic = await services.getCommonStatistic();
      dispatch({
        type: actionType.GET_COMMON_STATISTIC_SUCCESS,
        payload: statistic,
      });
    } catch (error) {
      console.error("Err from get common statistic!:", error);
      dispatch({
        type: actionType.GET_COMMON_STATISTIC_FAILED,
        payload: null,
      });
    }
  };
};
