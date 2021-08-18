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
  return <ScrollView>{postsList}</ScrollView>;
};

export default MyPosts;

const styles = StyleSheet.create({});
