import userReducer from './userReducer';
import adminReducer from './adminReducer';  
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

export default rootReducer;
