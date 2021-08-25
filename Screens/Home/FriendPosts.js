import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { Entypo } from "@expo/vector-icons";
import { addFriend } from "../../store/actions/friendActions";

const FriendPosts = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { friend } = route.params;
  const friends = useSelector((state) => state.friendsReducer.friends);
  const user = useSelector((state) => state.authReducer.user);
  const foundFriend = friends.find((f) => f.username === friend.username);

  const relation = { firstUserId: user.id, secondUserId: friend.id };
  const handleAdd = () => {
    dispatch(addFriend(relation, friend));
  };
  console.log(friends, "friends");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.username}>{friend.username}</Text>

          <Entypo
            name="add-user"
            size={24}
            color="white"
            style={{
              display: foundFriend ? "none" : "flex",
              // marginLeft: 2,
              left: 145,
            }}
            onPress={handleAdd}
          />
        </View>
        <Image
          source={{
            uri:
              friend.image ||
              "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png",
          }}
          style={styles.image}
        />
      </View>
      <ScrollView style={styles.list}>
        {foundFriend || friend.isPublic ? (
          friend.posts.length !== 0 ? (
            friend.posts.map((post) => (
              <PostCard post={post} key={post.id} navigation={navigation} />
            ))
          ) : (
            <Text style={styles.warning}>
              {friend.username} has no posts yet 😭 !
            </Text>
          )
        ) : (
          <Text style={styles.warning}>
            {friend.username} is private, add him to see his posts
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendPosts;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "8%",
    // height: "23%",
  },
  username: { fontSize: 25, color: "white", paddingBottom: 10 },
  image: { width: 120, height: 120, borderRadius: 100 },

  warning: {
    textAlign: "center",
    alignSelf: "center",
    top: "1000%",
    color: "gray",
  },
  list: { paddingTop: 10 },
});
