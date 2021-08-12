import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import Login from "../Screens/Authentication/Login";
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
        </Navigator>
      )}
    </>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
