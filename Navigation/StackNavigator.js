import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import Login from "../Screens/Authentication/Login";
import Home from "../Screens/Home";
import TabNavigator from "./TabNavigator";

const { Navigator, Screen } = createStackNavigator();
const StackNavigator = () => {
  return (
    <Navigator
      initialRouteName={"Login"}
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="Tab" component={TabNavigator} />
    </Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
