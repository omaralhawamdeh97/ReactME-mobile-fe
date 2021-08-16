import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Video } from "expo-av";
import moment from "moment";

const PostCard = ({ post, navigation }) => {
  const date = moment(post.createdAt).fromNow();
  const { user } = post;
  const [play, setPlay] = useState(false);
  const start = () => {
    play ? setPlay(false) : setPlay(true);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userImage}>
          <Image
            source={{
              uri: user.image
                ? user.image
                : "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png",
            }}
            style={styles.image}
          />
          <Text style={styles.username}>{user.username}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <TouchableOpacity onPress={start} activeOpacity={1}>
        <Video
          style={styles.video}
          source={{
            uri: post.video,
          }}
          isLooping
          resizeMode="stretch"
          shouldPlay={play}
        />
      </TouchableOpacity>
      <Button
        title="Reactions"
        onPress={() =>
          navigation.navigate("Reactions", {
            reactions: post.reactions,
            postVideo: post.video,
          })
        }
      />
      <Button
        title="React"
        onPress={() =>
          navigation.navigate("ReactionCam", {
            postVideo: post.video,
          })
        }
      />
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    marginVertical: 5,
    height: 255,
  },
  card: {
    marginVertical: "3%",
  },
  date: { fontSize: 10, color: "gray" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  userImage: { flexDirection: "row", alignItems: "center" },
  image: { width: 50, height: 50, borderRadius: 100 },
  username: { fontSize: 18, paddingLeft: 10 },
});
