import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import ImageView from "react-native-image-viewing";

const WINDOW_WIDTH = Dimensions.get("window").width;

const FriendCard = ({ friend, navigation }) => {
  const [visible, setIsVisible] = useState(false);
  const images = [{ uri: friend.image }];

  return (
    <SafeAreaView style={styles.card}>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Image
          source={{
            uri: friend.image
              ? friend.image
              : "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.username}>{friend.username}</Text>
      <Text
        style={styles.posts}
        onPress={() => navigation.navigate("FriendPosts", { friend: friend })}
      >
        {friend.posts.length} posts
      </Text>
    </SafeAreaView>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.3,
    borderRadius: 15,
    height: 105,
    flexDirection: "row",
    shadowColor: "gray",
    alignItems: "center",
    shadowOpacity: 0.2,
    marginBottom: 10,
    borderColor: "#481049",
  },
  image: { width: 65, height: 65, borderRadius: 10, marginLeft: 15 },
  username: { marginLeft: 15, color: "white" },
  posts: {
    alignSelf: "flex-end",
    position: "absolute",
    left: WINDOW_WIDTH - 80,
    paddingBottom: 13,
    color: "white",
  },
});
