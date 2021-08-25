import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import FriendCard from "./FriendCard";

const Friends = ({ navigation }) => {
  const friends = useSelector((state) => state.friendsReducer.friends);

  const friendsList = friends
    .map((friend) => (
      <FriendCard friend={friend} navigation={navigation} key={friend.id} />
    ))
    .reverse();

  return (
    <ScrollView style={{ paddingLeft: 5, paddingTop: 5 }}>
      {friendsList}
    </ScrollView>
  );
};

export default Friends;

const styles = StyleSheet.create({});
