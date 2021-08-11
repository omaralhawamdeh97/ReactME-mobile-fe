import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
} from "react-native";
import { LoginButton, LoginText } from "./styles";

const Login = ({ navigation }) => {
  const { navigate } = navigation;
  const [user, setUser] = useState({ username: "", password: "" });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={{
              uri: "https://cdn.discordapp.com/attachments/843745586825920552/874993310811455498/personal-2923048.jpg",
            }}
            style={styles.image}
          />
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            onChangeText={(username) => setUser({ ...user, username })}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(password) => setUser({ ...user, password })}
          />
          <View style={styles.btnContainer}>
            <LoginButton backgroundColor={"#481049"}>
              <LoginText color={"white"}>Login</LoginText>
            </LoginButton>
            <View style={styles.orView}>
              <View style={styles.line} />

              <Text style={styles.orText}>or</Text>

              <View style={styles.line} />
            </View>
            <LoginButton backgroundColor={"white"}>
              <LoginText color={"black"}>Sign Up</LoginText>
            </LoginButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  textInput: {
    height: 60,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
    marginTop: 10,
    width: "88%",
    alignSelf: "center",
  },
  image: {
    height: "40%",
    width: "100%",
  },

  orView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  orText: { width: 50, textAlign: "center", color: "#747474" },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
});
