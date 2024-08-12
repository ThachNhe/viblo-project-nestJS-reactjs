import actionTypes from "../action/actionType";
const initialState = {
  users: {}
};
function adminReducer(state = initialState, action) {
    switch (action.type) {
      //   case actionTypes.GET_ALL_USER:
      //       state.users = action.payload;
      //       return { ...state };
        default:
            return state;
    }
}
export default adminReducer;