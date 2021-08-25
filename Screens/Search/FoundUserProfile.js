import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostCard from "../Home/PostCard";

const FoundUserProfile = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
        <Image
          source={{
            uri:
              user.image ||
              "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png",
          }}
          style={styles.image}
        />
      </View>
      <ScrollView style={styles.list}>
        {user.posts.length !== 0 ? (
          user.posts.map((post) => (
            <PostCard post={post} key={post.id} navigation={navigation} />
          ))
        ) : (
          <Text style={styles.warning}>
            {user.username} has no posts yet 😭 !
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoundUserProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "8%",
    // height: "23%",
  },
  username: { fontSize: 25, color: "white" },
  image: { width: 120, height: 120, borderRadius: 100 },

  warning: {
    textAlign: "center",
    alignSelf: "center",
    top: "1000%",
    color: "gray",
  },
  list: { paddingTop: 10 },
});
