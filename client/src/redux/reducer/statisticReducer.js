import actionTypes from "../action/actionType";
const initialState = {
  tagStatisticData: {},
  commonStatisticData: {},
};
function StatisticReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TAG_STATISTIC_SUCCESS:
      state.tagStatisticData = action.payload;
      return { ...state };
    case actionTypes.GET_TAG_STATISTIC_FAILED:
      state.tagStatisticData = action.payload;
      return { ...state };

    case actionTypes.GET_COMMON_STATISTIC_SUCCESS:
      state.commonStatisticData = action.payload;
      return { ...state };

    case actionTypes.GET_COMMON_STATISTIC_FAILED:
      state.commonStatisticData = action.payload;
      return { ...state };
    default:
      return state;
  }
}
export default StatisticReducer;
