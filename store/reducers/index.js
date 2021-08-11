import { combineReducers } from "redux";
import authReducer from "./authReducer";

const bigR = combineReducers({
  authReducer,
});

export default bigR;
