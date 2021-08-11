import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const Login = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <View>
      <SafeAreaView />
      <Text onPress={() => navigation.replace("Tab")}>Login!</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
