import moment from "moment";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Video } from "expo-av";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const ReactionCard = ({ reaction, postVideo }) => {
  const date = moment(reaction.createdAt).fromNow();
  const [start, setStart] = useState(false);
  const [videoStatus, setVideoStatus] = useState({});
  const startVideo = () => {
    start ? setStart(false) : setStart(true);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={startVideo}>
      <View style={styles.card}>
        <Video
          source={{ uri: postVideo }}
          style={styles.media}
          // isLooping
          resizeMode="cover"
          shouldPlay={start && videoStatus.isPlaying}
          volume={0}
        />
        <Video
          style={styles.video}
          source={{
            uri: reaction.video,
          }}
          shouldPlay={start}
          resizeMode="cover"
          // isLooping
          onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
        />
        <View style={styles.footer}>
          <Text style={styles.text}>
            Reaction by : {reaction.user.username}
          </Text>
          <Text style={styles.text}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReactionCard;

const styles = StyleSheet.create({
  video: {
    marginTop: 19,
    width: 165,
    height: 165,
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 3,
  },
  card: {
    height: WINDOW_HEIGHT,
    flex: 1,
  },

  media: {
    ...StyleSheet.absoluteFillObject,
    // height: WINDOW_HEIGHT,
  },
  footer: {
    shadowColor: "gray",
    shadowRadius: 20,
    bottom: -500,
    shadowOpacity: 15,
    shadowOffset: { height: 150, width: 50 },
    textShadowColor: "white",
    shadowOpacity: 0.82,
    paddingLeft: 19,
  },
  text: {
    color: "white",
  },
});
