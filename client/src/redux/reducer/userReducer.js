import actionTypes from "../action/actionType";
const initialState = {
  userAvatar: "",
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_USER_AVATAR:
      state.userAvatar = action.payload;
      return { ...state };
    case actionTypes.USER_LOGIN_SUCCESS:
      state.userAvatar = action?.payload?.data?.user?.avatar;
      return { ...state };
    default:
      return state;
  }
}

export default userReducer;
