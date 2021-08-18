import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./instance";
import * as actionTypes from "./actionsTypes";
import { fetchFriends } from "./friendActions";

export const addReaction = (newReaction) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("myToken");
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      console.log("entered,Action");
      const res = await instance.post("/reactions/new", newReaction);
      dispatch(fetchFriends());
    } catch (error) {
      console.log(error);
    }
  };
};
