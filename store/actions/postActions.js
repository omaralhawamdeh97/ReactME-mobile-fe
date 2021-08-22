import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./instance";
import * as actionTypes from "./actionsTypes";

export const addPost = (newPost) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("myToken");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await instance.post("/posts/new", newPost);

      dispatch(fetchPosts());
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

export const getPublicPosts = (pageNumber) => {
  return async (dispatch) => {
    try {
      const res = await instance.get(`/posts/${pageNumber}/public`);
      dispatch({
        type: actionTypes.FETCH_PUBLIC_POSTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
