import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import { Fontisto } from "@expo/vector-icons";
import Explore from "../Screens/Explore";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return <AntDesign name="home" size={25} color="white" />;
          }
          if (route.name === "Explore") {
            return <Fontisto name="world-o" size={24} color="white" />;
          }
          if (route.name === "Profile") {
            return (
              <Ionicons
                name="person-circle-outline"
                size={30}
                color={"white"}
              />
            );
          }
        },
        tabBarStyle: {
          backgroundColor: "black",
          height: "8%",
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({ omar: {} });
