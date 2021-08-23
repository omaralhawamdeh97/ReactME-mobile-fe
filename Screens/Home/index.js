import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import {
  fetchFriends,
  refreshFriends,
} from "../../store/actions/friendActions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import { addPost } from "../../store/actions/postActions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
var postsList = [];

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const friends = useSelector((state) => state.friendsReducer.friends);
  const [refreshing, setRefreshing] = React.useState(false);
  const [openCam, setOpenCam] = useState(false);
  const postsLoading = useSelector((state) => state.postsReducer.loading);

  useEffect(() => {
    dispatch(refreshFriends());
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000)
      .then(() => setRefreshing(false))
      .then(() => dispatch(refreshFriends()));
  }, []);

  const postsMaking = friends?.map((friend) =>
    friend.posts.forEach((post) => postsList.push(post))
  );

  const posts = postsList
    .map((post) => (
      <PostCard post={post} key={post.id} navigation={navigation} />
    ))
    .reverse();

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

    if (!result.cancelled) {
      dispatch(addPost(formData));
    } else {
      console.log("bye");
    }
  };

  const sheet = (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        container: {
          opacity: 1,
          height: 112,
          flexDirection: "cloumn",
        },
      }}
      animationType="fade"
    >
      <View style={styles.sheet}>
        <TouchableOpacity onPress={pickVideo}>
          <MaterialIcons name="my-library-add" size={50} color="#481049" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenCam(true)}>
          <MaterialCommunityIcons name="video" size={50} color="#481049" />
        </TouchableOpacity>
      </View>
    </RBSheet>
  );

  if (postsLoading) {
    return <Text>Loding...</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      <SafeAreaView />
      <View style={styles.header}>
        <Image source={require("../../assets/test.png")} style={styles.image} />
        <MaterialCommunityIcons
          onPress={() => refRBSheet.current.open()}
          name="plus-box-outline"
          size={30}
          color={"white"}
        />
      </View>
      {sheet}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
      >
        {posts}
        {openCam ? navigation.navigate("Cam") : <></>}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    paddingHorizontal: "2%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  warning: { color: "gray", textAlign: "center", paddingTop: "50%" },
  sheet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: "5%",
  },
  image: {
    height: "100%",
    width: 150,
  },
});
