import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";
import { addPost } from "../../store/actions/postActions";
import { EvilIcons } from "@expo/vector-icons";
import PostCard from "./PostCard";

const Home = () => {
  const posts = useSelector((state) => state.postsReducer.posts);
  const dispatch = useDispatch();

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `video/${match[1]}` : `video`;

    let formData = new FormData();

    formData.append("video", { uri: localUri, name: filename, type });
    formData.append("title");
    if (!result.cancelled) {
      dispatch(addPost(formData));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <TouchableOpacity onPress={pickVideo} style={styles.icon}>
        <EvilIcons name="plus" size={40} color="black" />
      </TouchableOpacity>
      <ScrollView>
        {posts.map((post) => <PostCard post={post} key={post.id} />).reverse()}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  icon: {
    alignSelf: "flex-end",
    paddingRight: "3%",
    paddingTop: "3%",
  },
  container: {
    flex: 1,
  },
});
