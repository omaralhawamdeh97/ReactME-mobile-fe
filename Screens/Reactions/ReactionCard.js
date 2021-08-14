import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";

const ReactionCard = ({ reaction }) => {
  const date = moment(reaction.createdAt).add(24, "hours").format("LLL");

  return (
    <View style={styles.card}>
      <Text>{date}</Text>
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
    width: "100%",
    marginVertical: 15,
    height: 250,
    borderRadius: 20,
  },
  card: {
    marginHorizontal: "10%",
    marginVertical: "3%",
  },
});
