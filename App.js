import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import StackNavigator from "./Navigation/StackNavigator";
import TabNavigator from "./Navigation/TabNavigator";
import store from "./store/index";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
