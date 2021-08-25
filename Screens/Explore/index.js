import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPublicPosts } from "../../store/actions/postActions";
import PublicPostCard from "./PulicPostCard";
import { EvilIcons } from "@expo/vector-icons";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const Explore = ({ navigation }) => {
  const dispatch = useDispatch();
  const publicPosts = useSelector((state) => state.postsReducer.publicPosts);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    dispatch(getPublicPosts(pageNumber));
  }, [pageNumber]);
  const renderedPosts = publicPosts.map((post) => (
    <PublicPostCard post={post} navigation={navigation} key={post.id} />
  ));
  return (
    <View style={styles.containter}>
      {/* <Text>Explore</Text> */}
      <ScrollView pagingEnabled>
        {renderedPosts}
        <TouchableOpacity
          onPressIn={() => setPageNumber(pageNumber + 1)}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EvilIcons name="spinner" size={30} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  containter: { flex: 1 },
});
