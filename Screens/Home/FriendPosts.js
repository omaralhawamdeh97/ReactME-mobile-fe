import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostCard from "./PostCard";

const FriendPosts = ({ route, navigation }) => {
  const { friend } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{friend.username}</Text>
        <Image
          source={{
            uri:
              friend.image ||
              "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.list}>
        {friend.posts.length !== 0 ? (
          <ScrollView>
            {friend.posts.map((post) => (
              <PostCard post={post} key={post.id} navigation={navigation} />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.warning}>
            {friend.username} has no posts yet 😭 !
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FriendPosts;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "8%",
    backgroundColor: "gray",
    height: "23%",
  },
  username: { fontSize: 25 },
  image: { width: 120, height: 120, borderRadius: 100 },

  warning: { textAlign: "center", alignSelf: "center", top: "1000%" },
  list: { paddingTop: 10 },
});
