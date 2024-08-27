import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";
import tagReducer from "./tagReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  tag: tagReducer,
  post: postReducer,
  comment: commentReducer,
});

export default rootReducer;
