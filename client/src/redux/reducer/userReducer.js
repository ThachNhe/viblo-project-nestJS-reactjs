import { all } from "axios";
import actionTypes from "../action/actionType";

const initialState = {
  userAvatar: "",
  isWriting: "",
  allUsers: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_USER:
      state.allUsers = action.payload;
      console.log("all user reducer: ", action.payload);
      return { ...state };
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