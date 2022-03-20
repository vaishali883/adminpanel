import { combineReducers } from "redux";
import userReducer from './reducer/userReducer';
import artistReducer from './reducer/artistReducer';
import typeReducer from './reducer/typeReducer'

const store = combineReducers({
  user:userReducer,
  artist:artistReducer,
  type:typeReducer
})
export default store;