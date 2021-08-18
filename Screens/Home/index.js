import React, { useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { addPost } from "../../store/actions/postActions";
import { EvilIcons } from "@expo/vector-icons";
import PostCard from "./PostCard";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchFriends } from "../../store/actions/friendActions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({ navigation }) => {
  const refRBSheet = useRef();
  const friends = useSelector((state) => state.friendsReducer.friends);
  const [refreshing, setRefreshing] = React.useState(false);
  const posts = useSelector((state) => state.postsReducer.posts);
  const postsLoading = useSelector((state) => state.postsReducer.loading);
  const [openCam, setOpenCam] = useState(false);
  const dispatch = useDispatch();

  var postsList = [];
  const postsMaking = friends?.map((friend) =>
    friend.posts.forEach((post) => postsList.push(post))
  );

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchFriends());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      {postsLoading ? (
        <Text>Loading..</Text>
      ) : (
        <View style={styles.container}>
          <SafeAreaView />
          <View style={styles.header}>
            <Text></Text>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <EvilIcons name="plus" size={40} color="#481049" />
            </TouchableOpacity>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  opacity: 1,
                  height: "19%",
                  flexDirection: "cloumn",
                },
              }}
              animationType="fade"
            >
              <View style={styles.sheet}>
                <TouchableOpacity onPress={pickVideo}>
                  <MaterialIcons
                    name="my-library-add"
                    size={50}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenCam(true)}>
                  <MaterialCommunityIcons
                    name="video"
                    size={50}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </RBSheet>
          </View>

          {openCam ? navigation.navigate("Cam") : <></>}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {postsList
              .map((post) => (
                <PostCard post={post} key={post.id} navigation={navigation} />
              ))
              .reverse()}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  header: {
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  warning: { color: "gray", textAlign: "center", paddingTop: "50%" },
  sheet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: "5%",
  },
});
