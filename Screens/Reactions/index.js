import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Video } from "expo-av";
import ReactionCard from "./ReactionCard";

const Reactions = ({ route }) => {
  const { reactions } = route.params;
  console.log(reactions);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text>Reactions</Text>
      {reactions.length !== 0 ? (
        <ScrollView>
          {reactions.map((reaction) => (
            <ReactionCard reaction={reaction} key={reaction.id} />
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
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  video: {
    width: "100%",
    marginVertical: 15,
    height: 350,
    borderRadius: 20,
  },
});
