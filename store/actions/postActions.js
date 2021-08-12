import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./instance";
import * as actionTypes from "./actionsTypes";

export const addPost = (newPost) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("myToken");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;

      const res = await instance.post("/posts/new", newPost);
      dispatch({
        type: actionTypes.ADD_POST,
        payload: { newPost: res.data },
      });
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("myToken");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await instance.get("/posts");
      dispatch({
        type: actionTypes.FETCH_POSTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
