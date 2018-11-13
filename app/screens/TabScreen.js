import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./tabs/HomeScreen";
import NotificationsScreen from "./tabs/NotificationsScreen";
import NewsScreen from "./tabs/NewsScreen";
import IconSet from "../libs/icon_set";
import WalletScreen from "./tabs/WalletScreen";

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Screen 3",
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <IconSet
            type="Entypo"
            name="home"
            size={24}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <IconSet
            type="Entypo"
            size={24}
            name="notification"
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
          <IconSet
            type="Entypo"
            size={24}
            name="newsletter"
            style={{ color: tintColor, marginLeft: 20 }}
          />
        )
      }
    },
    Wallet: {
      screen: WalletScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <IconSet
            type="Entypo"
            name="wallet"
            size={24}
            style={{ color: tintColor }}
          />
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
