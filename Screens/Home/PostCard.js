import React, { useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
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
  const [videoStatus, setVideoStatus] = useState({});
  const [hover, setHover] = useState("none");

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

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ReactionCam", {
            postVideo: post.video,
            postId: post.id,
          })
        }
        activeOpacity={1}
        onPressIn={() => setHover(() => "flex")}
        onPressOut={() => setHover(() => "none")}
      >
        <View
          style={{ backgroundColor: "black" }}
          style={{
            width: "100%",
            height: 270,
            zIndex: 1,
            position: "absolute",
            display: hover,
            borderRadius: 150,
          }}
        >
          <Image
            source={require("../../assets/hover.png")}
            style={{
              width: "100%",
              height: 270,
              // zIndex: 1,
              // position: "absolute",
              // display: hover,
              // borderRadius: 150,
            }}
          />
        </View>
        <Video
          style={styles.video}
          source={{
            uri: post.video,
          }}
          isLooping
          resizeMode="stretch"
          shouldPlay={play}
          usePoster={!videoStatus.isLoaded}
          posterSource={require("../../assets/loading.png")}
          posterStyle={{
            width: "100%",
            height: "100%",
          }}
          onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Reactions", {
            reactions: post.reactions,
            postVideo: post.video,
          })
        }
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
          paddingRight: 20,
        }}
      >
        <Image
          source={require("../../assets/white.png")}
          style={{ width: 70, height: 50 }}
        />
        <View style={styles.countCircle}>
          <Text style={styles.number}>{post.reactions.length}</Text>
        </View>
      </TouchableOpacity>
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
  username: { fontSize: 18, paddingLeft: 10, color: "white" },
  countCircle: {
    borderRadius: 150,
    height: 23,
    width: "auto",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  number: { fontSize: 18, color: "black" },
});
