import actionTypes from "../action/actionType";
const initialState = {
  post: "",
  paginationPosts: [],
};
function postReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_POST_ID_SUCCESS:
      state.post = action.payload;
      return { ...state };
    case actionTypes.GET_POST_ID_FAILED:
      state.post = action.payload;
      return { ...state };
    case actionTypes.GET_POST_PAGINATION_SUCCESS:
      state.paginationPosts = action.payload;
    case actionTypes.GET_POST_PAGINATION_FAILED:
      state.paginationPosts = action.payload;
      return { ...state };
    default:
      return state;
  }
}
export default postReducer;
