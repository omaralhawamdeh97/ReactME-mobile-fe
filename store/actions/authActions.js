import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "./instance";
import * as actionTypes from "./actionsTypes";
import decode from "jwt-decode";

// ACTIONS
export const signup = (user, navigation, setError) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signup", user);
      dispatch(setUser(res.data.token));
    } catch (error) {
      if (error.message.includes("500")) {
        setError(error.message);
      }
    }
  };
};
export const signin = (user, navigation, setError) => {
  return async (dispatch) => {
    try {
      const res = await instance.post("/signin", user);
      dispatch(setUser(res.data.token));
      console.log("res.data.token");
      navigation.replace("Tab");
    } catch (error) {
      if (error.message.includes("401")) {
        setError("Invalid username or password");
      } else {
        setError("Connection problem");
      }
    }
  };
};
export const signout = () => {
  localStorage.removeItem("myToken");
  return {
    type: actionTypes.SET_USER,
    payload: null,
  };
};
export const checkForToken = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("myToken");
  if (token) {
    const currentTime = Date.now();
    const user = decode(token);
    if (user.exp > currentTime) return dispatch(setUser(token));
  }
  dispatch(setUser());
};
const setUser = (token) => async (dispatch) => {
  if (token) {
    await AsyncStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    dispatch({
      type: actionTypes.SET_USER,
      payload: decode(token),
    });
  } else {
    await AsyncStorage.removeItem("myToken");
    dispatch({
      type: actionTypes.SET_USER,
      payload: null,
    });
  }
};
// export const fetchUsers = () => {
//   return async (dispatch) => {
//     try {
//       const res = await instance.get("/users");

//       dispatch({
//         type: actionTypes.FETCH_USERS,
//         payload: res?.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const updateUser = (body,user) => {
//   return async (dispatch) => {
//     try {
//       const res = await instance.put(`${user.id}`,body);

//       dispatch({
//         type: actionTypes.FETCH_USERS,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
