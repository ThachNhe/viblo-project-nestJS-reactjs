import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});

export default rootReducer;
