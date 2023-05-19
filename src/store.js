import { combineReducers } from "redux";
import userReducer from './reducer/userReducer';
import artistReducer from './reducer/artistReducer';
import typeReducer from './reducer/typeReducer';
import songReducer from "./reducer/songReducer";

const store = combineReducers({
  user:userReducer,
  artist:artistReducer,
  type:typeReducer,
  songs:songReducer
})
export default store;