import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import moment from "moment";

const PostCard = ({ post, navigation }) => {
  const date = moment(post.createdAt).add(24, "hours").format("LLL");
  return (
    <View style={styles.card}>
      <Text>{date}</Text>
      <Video
        style={styles.video}
        source={{
          uri: post.video,
        }}
        useNativeControls
        resizeMode="cover"
      />
      <Button
        title="Reactions"
        onPress={() =>
          navigation.navigate("Reactions", { reactions: post.reactions })
        }
      />
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
    marginVertical: "3%",
  },
});
