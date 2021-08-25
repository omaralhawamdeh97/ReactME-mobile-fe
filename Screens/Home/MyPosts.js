import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

const MyPosts = ({ navigation }) => {
  const posts = useSelector((state) => state.postsReducer.posts);
  const postsList = posts
    .map((post) => (
      <PostCard post={post} key={post.id} navigation={navigation} />
    ))
    .reverse();
  return (
    <ScrollView style={{ paddingLeft: 5, paddingTop: 5 }}>
      {postsList}
    </ScrollView>
  );
};

export default MyPosts;

const styles = StyleSheet.create({});
