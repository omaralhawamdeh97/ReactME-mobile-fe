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

var index;

const WINDOW_HEIGHT = Dimensions.get("window").height;
const videoSize = Math.floor(WINDOW_HEIGHT * 0.13);

const SmallPostCard = ({ post, navigation }) => {
  const date = moment(post.createdAt).fromNow();
  index = post.id;
  index % 5 === 0 ? (index = 2) : (index = 1);
  console.log(index);
  const { user } = post;
  const [play, setPlay] = useState(false);
  const [videoStatus, setVideoStatus] = useState({});

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
        onPressIn={() => start}
        onPressOut={start}
      >
        <Video
          style={styles.video}
          source={{
            uri: post.video,
          }}
          isLooping
          shouldPlay={play}
          resizeMode="cover"
          usePoster={!videoStatus.isLoaded}
          posterSource={require("../../assets/loading.png")}
          posterStyle={{
            width: "100%",
            height: "100%",
          }}
          onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SmallPostCard;

const styles = StyleSheet.create({
  video: {
    height: videoSize,
    width: videoSize * 2,
  },
  card: {
    height: 220,
    width: "100%",
    margin: 1,
    borderColor: "#444444",
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
