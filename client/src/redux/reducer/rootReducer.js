import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";
import tagReducer from "./tagReducer";
import postReducer from "./postReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  tag: tagReducer,
  post: postReducer,
});

export default rootReducer;
