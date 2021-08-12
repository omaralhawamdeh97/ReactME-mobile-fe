import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";

const PostCard = ({ post }) => {
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
      <Text>Comments</Text>
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
  card: { marginHorizontal: "10%" },
});
