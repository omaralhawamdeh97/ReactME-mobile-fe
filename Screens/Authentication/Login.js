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
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../store/actions/authActions";
import { LoginButton, LoginText } from "./styles";

const Login = ({ navigation }) => {
  const { navigate } = navigation;

  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(signin(user, navigation, setError));
  };

  let checkFields = true;
  if (user.username !== "" && user.password !== "") {
    checkFields = false;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(password) => setUser({ ...user, password })}
            secureTextEntry
          />
          <View style={styles.btnContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <LoginButton
              backgroundColor={"#481049"}
              onPress={handleLogin}
              disabled={checkFields}
            >
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
    marginBottom: 15,
  },
  inner: {
    justifyContent: "space-evenly",
  },
  textInput: {
    height: 60,
    borderBottomWidth: 1,
    marginBottom: 36,
    marginTop: 10,
    width: "88%",
    alignSelf: "center",
  },
  image: {
    height: "39%",
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
    marginHorizontal: "7%",
  },
  errorText: { textAlign: "center", color: "red" },
});
