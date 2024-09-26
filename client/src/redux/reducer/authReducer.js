import actionTypes from "../action/actionType";
const initialState = {
  userRegister: {},
  userInfo: {},
  isLogin: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_REGISTER_SUCCESS:
      state.userRegister = action.payload;
      return { ...state };

    case actionTypes.USER_REGISTER_FAILURE:
      state.userRegister = null;
      return { ...state };

    case actionTypes.USER_LOGIN_SUCCESS:
      state.userInfo = action.payload;
      state.isLogin = true;
      return { ...state };

    case actionTypes.USER_LOGIN_FAILURE:
      state.userInfo = null;
      state.isLogin = false;
      return { ...state };

    case actionTypes.USER_LOGOUT_SUCCESS:
      state.userInfo = null;
      state.isLogin = false;

      return { ...state };

    default:
      return state;
  }
}
export default authReducer;
