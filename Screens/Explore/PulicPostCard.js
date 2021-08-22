import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Video } from "expo-av";
import moment from "moment";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const PublicPostCard = ({ post, navigation }) => {
  const date = moment(post.createdAt).fromNow();
  const { user } = post;
  const [play, setPlay] = useState(false);

  const start = () => {
    play ? setPlay(false) : setPlay(true);
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ReactionCam", {
            postVideo: post.video,
            postId: post.id,
          })
        }
        activeOpacity={1}
        style={styles.video}
      >
        <Video
          style={styles.video}
          source={{
            uri: post.video,
          }}
          isLooping
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.footer}>
        <View>
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
        <Button
          title={`Reactions ${post.reactions.length}`}
          onPress={() =>
            navigation.navigate("Reactions", {
              reactions: post.reactions,
              postVideo: post.video,
            })
          }
        />
        <ImageBackground
          source={require("../../assets/white.png")}
          style={{ width: 70, height: 50 }}
        ></ImageBackground>
      </View>
    </View>
  );
};

export default PublicPostCard;

const styles = StyleSheet.create({
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    height: WINDOW_HEIGHT - 58,
    flexDirection: "column-reverse",
  },
  date: { fontSize: 10, color: "gray" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  userImage: { flexDirection: "row", alignItems: "center" },
  image: { width: 50, height: 50, borderRadius: 100 },
  username: { fontSize: 18, color: "white", paddingLeft: 10 },
});
