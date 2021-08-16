import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";

const ReactionCard = ({ reaction, postVideo }) => {
  const date = moment(reaction.createdAt).add(24, "hours").format("LLL");
  // console.log(postVideo, "postV");
  console.log(reaction.video, "reactionV");
  return (
    <View style={styles.card}>
      <Text>{date}</Text>
      <Video
        source={{ uri: postVideo }}
        style={styles.media}
        isLooping
        resizeMode="cover"
        useNativeControls
      />
      <Video
        style={styles.video}
        source={{
          uri: reaction.video,
        }}
        useNativeControls
        resizeMode="cover"
      />
      <Text>Reaction by : {reaction.user.username}</Text>
    </View>
  );
};

export default ReactionCard;

const styles = StyleSheet.create({
  video: {
    width: "45%",
    marginVertical: 15,
    height: 80,
    alignSelf: "flex-end",
    alignSelf: "center",
    borderRadius: 20,
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    // marginHorizontal: "10%",
    marginVertical: "4%",
    height: "100%",
  },

  media: {
    height: "100%",
  },
});
