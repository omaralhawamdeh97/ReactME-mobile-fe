import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";

const bigR = combineReducers({
  authReducer,
  postsReducer,
});

export default bigR;
