import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { goPublic } from "../../store/actions/authActions";
import Friends from "../Friends";
import MyPosts from "../Home/MyPosts";
import PostCard from "../Home/PostCard";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.user);
  const posts = useSelector((state) => state.postsReducer.posts);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const friends = useSelector((state) => state.friendsReducer.friends);
  const dispatch = useDispatch();

  const [isViewing, setIsViewing] = useState("posts");

  if (userLoading) {
    return <Text>Loading..</Text>;
  }

  const top = (
    <View style={styles.top}>
      <Text style={styles.username}>{user.username}</Text>
      <Image
        source={{
          uri:
            user.image ||
            "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png",
        }}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => console.log("presse0d")}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", paddingTop: 3 }}>
        <Text>Go public</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={!user.isPublic ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(isPublic) => {
            dispatch(goPublic({ isPublic }));
          }}
          value={user.isPublic}
          style={{ marginLeft: 15 }}
        />
      </View>
    </View>
  );

  const stats = (
    <View style={styles.pf}>
      <View>
        <TouchableOpacity onPress={() => setIsViewing("posts")}>
          <Text>Posts</Text>
          <Text style={styles.count}>{posts.length}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsViewing("friends")}>
          <Text>Friends</Text>
          <Text style={styles.count}>{friends.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const isViewingComponent =
    isViewing === "posts" ? (
      <MyPosts navigation={navigation} />
    ) : (
      <Friends navigation={navigation} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView>
        {top}
        {stats}
        {isViewingComponent}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: {
    justifyContent: "center",
    alignItems: "center",
    // height: "23%",
    marginTop: 20,
  },
  username: { fontSize: 25 },
  image: { width: 120, height: 120, borderRadius: 100 },
  pf: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: 10,
    borderBottomWidth: 0.61,
    borderBottomColor: "#481049",
    paddingBottom: 25,
  },
  count: { textAlign: "center" },
  editButton: {
    width: 100,
    borderWidth: 0.41,
    alignSelf: "center",
    marginTop: 17,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    borderColor: "#481049",
  },
  list: { paddingTop: 10 },
});
