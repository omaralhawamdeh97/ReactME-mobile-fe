import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { goPublic, updateUserImage } from "../../store/actions/authActions";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const EditProfile = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.user);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const [info, setInfo] = useState({
    username: user.username,
    email: user.email,
  });
  const dispatch = useDispatch();

  if (userLoading) {
    return <Text>Loading..</Text>;
  }
  console.log(user.image);
  const top = (
    <View style={styles.top}>
      <Text style={styles.username}>{user.username}</Text>
    </View>
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    formData.append("image", { uri: localUri, name: filename, type });

    if (!result.cancelled) {
      dispatch(updateUserImage(formData));
    } else {
      console.log("bye");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={27}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <View style={{ width: "90%" }}>
          <Text style={styles.title}>Edit Profile</Text>
        </View>
      </View>
      <View style={styles.imageIcon}>
        <Image
          source={{
            uri:
              user.image ||
              "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png",
          }}
          style={styles.image}
        />
        <MaterialCommunityIcons
          name="image-edit-outline"
          size={24}
          color="white"
          style={styles.icon}
          onPress={pickImage}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#525252"
        onChangeText={(username) => setInfo({ ...info, username })}
        autoCapitalize="none"
        value={info.username}
        selectionColor="#525252"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#525252"
        onChangeText={(email) => setInfo({ ...info, email })}
        autoCapitalize="none"
        value={info.email}
        selectionColor="#525252"
      />
      <View style={{ flexDirection: "row", paddingTop: 3 }}>
        <Text style={styles.title}>
          {user.isPublic ? "Go Private" : "Go Public"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={!user.isPublic ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(isPublic) => {
            dispatch(goPublic({ isPublic }));
          }}
          value={user.isPublic}
          style={styles.switchSlide}
        />
      </View>
      <Text style={styles.disclaimer}>
        Being public means your videos will be posted in the explore and your
        posts will visible to everyone who searches for you
      </Text>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    paddingTop: 18,
  },
  imageIcon: {
    flexDirection: "row",
    left: 25,
  },
  title: { fontSize: 20, color: "gray", alignSelf: "center", paddingBottom: 5 },
  icon: {
    alignSelf: "flex-end",
    right: 20,
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: { width: 1 },
  },
  image: { width: 150, height: 200, borderRadius: 25, marginTop: 55 },
  switchSlide: { marginLeft: 15, marginBottom: 8 },
  input: {
    width: "80%",
    paddingVertical: 10,
    backgroundColor: "#1A1A1B",
    color: "#525252",
    borderRadius: 10,
    fontWeight: "bold",
    paddingHorizontal: 15,
    marginVertical: 25,
  },
  disclaimer: { fontSize: 9, color: "gray", width: "77%" },
  saveButton: {
    borderWidth: 1,
    borderColor: "#444444",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 4,
  },
  buttonText: { fontSize: 20, color: "gray" },
});
