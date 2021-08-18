import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Friends from "../Friends";
import MyPosts from "../Home/MyPosts";
import PostCard from "../Home/PostCard";

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.user);
  const posts = useSelector((state) => state.postsReducer.posts);
  const userLoading = useSelector((state) => state.authReducer.loading);
  const friends = useSelector((state) => state.friendsReducer.friends);

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
      {top}
      {stats}
      {isViewingComponent}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: {
    justifyContent: "center",
    alignItems: "center",
    height: "23%",
    marginTop: "6%",
  },
  username: { fontSize: 25 },
  image: { width: 120, height: 120, borderRadius: 100 },
  pf: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: 35,
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
