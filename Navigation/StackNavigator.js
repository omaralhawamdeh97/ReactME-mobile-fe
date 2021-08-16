import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import Login from "../Screens/Authentication/Login";
import Cam from "../Screens/Camera/Cam";
import ReactionCam from "../Screens/Camera/ReactionCam";
import FriendPosts from "../Screens/Home/FriendPosts";
import Reactions from "../Screens/Reactions";
import TabNavigator from "./TabNavigator";

const { Navigator, Screen } = createStackNavigator();
const StackNavigator = () => {
  const user = useSelector((state) => state.authReducer.user);
  const userLoading = useSelector((state) => state.authReducer.loading);

  return (
    <>
      {userLoading ? (
        <Text>loading...</Text>
      ) : (
        <Navigator
          initialRouteName={user ? "Tab" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          <Screen name="Login" component={Login} />
          <Screen name="Tab" component={TabNavigator} />
          <Screen name="Cam" component={Cam} />
          <Screen name="Reactions" component={Reactions} />
          <Screen name="ReactionCam" component={ReactionCam} />
          <Screen name="FriendPosts" component={FriendPosts} />
        </Navigator>
      )}
    </>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
