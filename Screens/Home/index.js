import React, { useEffect, useRef, useState } from "react";
import {
  Button,
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

const Home = ({ navigation }) => {
  const refRBSheet = useRef();

  const posts = useSelector((state) => state.postsReducer.posts);
  const postsLoading = useSelector((state) => state.postsReducer.loading);
  const [openCam, setOpenCam] = useState(false);
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
    <>
      {postsLoading ? (
        <Text>Loading..</Text>
      ) : (
        <View style={styles.container}>
          <SafeAreaView />
          <View style={styles.header}>
            <Text>My Videos</Text>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <EvilIcons name="plus" size={40} color="#481049" />
            </TouchableOpacity>

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  height: "19%",
                  flexDirection: "cloumn",
                },
              }}
            >
              <View style={styles.sheet}>
                <MaterialIcons
                  name="my-library-add"
                  size={50}
                  color="black"
                  onPress={pickVideo}
                />
                <MaterialCommunityIcons
                  name="video"
                  size={50}
                  color="black"
                  onPress={() => setOpenCam(true)}
                />
              </View>
            </RBSheet>
          </View>
          <ScrollView>
            {posts.length !== 0 ? (
              posts
                .map((post) => (
                  <PostCard post={post} key={post.id} navigation={navigation} />
                ))
                .reverse()
            ) : (
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Text style={styles.warning}>
                  No videos , press to start uploading !
                </Text>
              </TouchableOpacity>
            )}
            {openCam ? navigation.navigate("Cam") : <></>}
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
