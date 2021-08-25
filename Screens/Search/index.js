import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import instance from "../../store/actions/instance";
import FoundUserCard from "./FoundUserCard";

const Search = ({ navigation }) => {
  const [users, setUsers] = useState();
  const [value, setValue] = useState("");

  const getUsers = () => {
    instance.get(`/search/${username}`);
  };
  const handleChange = async (username) => {
    if (username === "") {
      setValue(username);
      setUsers([]);
      return;
    } else {
      setValue(username);
      const res = await instance.get(`/search/${username}`);
      setUsers(res.data.map((user) => user));
    }
  };

  const searchResults = users?.map((user) => (
    <FoundUserCard user={user} key={user.id} navigation={navigation} />
  ));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <AntDesign
          name="search1"
          size={18}
          color="#525252"
          onPress={() => navigation.navigate("Search")}
          style={{ paddingRight: 15 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#525252"
          onChangeText={(username) => handleChange(username)}
          autoCapitalize="none"
          value={value}
          selectionColor="#525252"
        />
      </View>

      <ScrollView>
        {searchResults?.length === 0 ? (
          <Text style={styles.errorMsg}>No match found</Text>
        ) : (
          searchResults
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1B",
    marginHorizontal: 18,
    paddingLeft: 6,
    borderRadius: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1A1A1B",
    color: "#525252",
    borderRadius: 10,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "#525252",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
