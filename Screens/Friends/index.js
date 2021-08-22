import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import FriendCard from "./FriendCard";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const Friends = ({ navigation }) => {
  const friends = useSelector((state) => state.friendsReducer.friends);

  const renderItem = (friend) => (
    <FriendCard friend={friend.item} navigation={navigation} />
  );

  const clickHandler = () => {
    //function to handle click on floating Action Button
    console.log("Floating Button Clicked");
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(friend) => friend.id}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.touchableOpacityStyle}
        onPress={clickHandler}
      >
        <Image
          source={{
            uri: "https://png1.12png.com/t/4/13/13/HmDV5133eM/friend-icon-add-friend-icon-social-media-icon.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { height: WINDOW_HEIGHT, paddingTop: 15 },
  touchableOpacityStyle: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 30,
    paddingRight: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
});
