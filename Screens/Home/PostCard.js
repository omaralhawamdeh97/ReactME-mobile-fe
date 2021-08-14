import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import moment from "moment";

const PostCard = ({ post }) => {
  const date = moment(post.createdAt).add(24, "hours").format("LLL");

  return (
    <View style={styles.card}>
      <Video
        style={styles.video}
        source={{
          uri: post.video,
        }}
        useNativeControls
        resizeMode="cover"
      />
      <Text>{date}</Text>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    marginVertical: 15,
    height: 350,
    borderRadius: 20,
  },
  card: {
    marginHorizontal: "10%",
  },
});
