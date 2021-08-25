import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./instance";
import * as actionTypes from "./actionsTypes";

export const fetchFriends = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("myToken");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await instance.get("/user/friends");
      dispatch({
        type: actionTypes.FETCH_FRIENDS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const refreshFriends = () => {
  console.log("here,actions");
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("myToken");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await instance.get("/user/friends");
      dispatch({
        type: actionTypes.REFRESH_FRIENDS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addFriend = (relation, friend) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("myToken");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      await instance.post("/friends", relation);
      dispatch({
        type: actionTypes.ADD_FRIEND,
        payload: friend,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
