import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Video } from "expo-av";
import ReactionCard from "./ReactionCard";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const Reactions = ({ route }) => {
  const { reactions } = route.params;
  const { postVideo } = route.params;
  return (
    <View style={styles.container}>
      <StatusBar animated barStyle={"default"} />
      {reactions?.length !== 0 ? (
        <ScrollView pagingEnabled>
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
    height: WINDOW_HEIGHT,
  },
});
