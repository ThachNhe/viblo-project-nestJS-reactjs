import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";
import tagReducer from "./tagReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";
import StatisticReducer from "./statisticReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  tag: tagReducer,
  post: postReducer,
  comment: commentReducer,
  user: userReducer,
  statistic: StatisticReducer,
});

export default rootReducer;
