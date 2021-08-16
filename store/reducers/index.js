import { combineReducers } from "redux";
import authReducer from "./authReducer";
import friendsReducer from "./friendsReducer";
import postsReducer from "./postsReducer";

const bigR = combineReducers({
  authReducer,
  postsReducer,
  friendsReducer,
});

export default bigR;
