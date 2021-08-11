import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Home from "../Screens/Home";
import Friends from "../Screens/Friends";
import Profile from "../Screens/Profile";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarActiveBackgroundColor: "white",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <AntDesign
                name={"home"}
                size={23}
                color={focused ? "black" : "white"}
              />
            );
          } else if (route.name === "Friends") {
            return (
              <FontAwesome5
                name="user-friends"
                size={24}
                color={focused ? "black" : "white"}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <AntDesign
                name="profile"
                size={24}
                color={focused ? "black" : "white"}
              />
            );
          }
        },
        tabBarStyle: {
          backgroundColor: "#481049",
          height: "8%",
          borderTopLeftRadius: "10%",
          borderTopRightRadius: "10%",
        },
      })}
    >
      <Tab.Screen name="Friends" component={Friends} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
