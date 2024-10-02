import actionTypes from "../action/actionType";
const initialState = {
  userNotifications: {},
};
function NotificationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_NOTIFICATION_SUCCESS:
      state.userNotifications = action.payload;
      return { ...state };

    case actionTypes.GET_USER_NOTIFICATION_FAILED:
      state.userNotifications = action.payload;
      return { ...state };
    default:
      return state;
  }
}
export default NotificationReducer;
