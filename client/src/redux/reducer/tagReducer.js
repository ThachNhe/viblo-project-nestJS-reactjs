import actionTypes from "../action/actionType";
const initialState = {
  tags: {},
};
function tagReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TAGS_SUCCESS:
      state.tags = action.payload;
      return { ...state };
    default:
      return state;
  }
}
export default tagReducer;
