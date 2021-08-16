import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import ReactionCard from "./ReactionCard";

const Reactions = ({ route }) => {
  const { reactions } = route.params;
  const { postVideo } = route.params;
  console.log(route.params, "entered");
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text>Reactions</Text>
      {reactions?.length !== 0 ? (
        <ScrollView>
          {reactions?.map((reaction) => (
            <ReactionCard
              reaction={reaction}
              key={reaction.id}
              postVideo={postVideo}
            />
          ))}
        </ScrollView>
      ) : (
        <Text> no reactions yet</Text>
      )}
    </View>
  );
};

export default Reactions;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    flex: 1,
  },
});
