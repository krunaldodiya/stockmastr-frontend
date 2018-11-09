import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./tabs/HomeScreen";
import NotificationsScreen from "./tabs/NotificationsScreen";
import NewsScreen from "./tabs/NewsScreen";
import SettingsScreen from "./tabs/SettingsScreen";

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon size={28} name="home" style={{ color: tintColor }} />
        )
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            size={22}
            name="bell"
            style={{ color: tintColor, marginRight: 20 }}
          />
        )
      }
    },
    Adding: {
      screen: () => null,
      navigationOptions: () => ({
        tabBarIcon: (
          <View
            style={{
              borderRadius: 60,
              backgroundColor: "#48A2F8",
              width: 75,
              height: 75,
              justifyContent: "center"
            }}
          >
            <Icon
              name="plus"
              color="white"
              size={24}
              style={{ textAlign: "center" }}
            />
          </View>
        )
      })
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            size={22}
            name="file-text"
            style={{ color: tintColor, marginLeft: 20 }}
          />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon size={22} name="bars" style={{ color: tintColor }} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#F8F8F8",
      inactiveTintColor: "#586589",
      style: {
        backgroundColor: "#171F33"
      }
    }
  }
);

export default AppTabNavigator;
