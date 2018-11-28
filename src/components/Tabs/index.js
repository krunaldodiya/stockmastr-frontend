import { Icon } from "native-base";
import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "../../containers/HomeScreen";
import NewsScreen from "../../containers/NewsScreen";
import NotificationsScreen from "../../containers/NotificationsScreen";
import WalletScreen from "../../containers/WalletScreen";

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Screen 3",
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
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
          <Icon
            type="Entypo"
            size={24}
            name="notification"
            style={{ color: tintColor }}
          />
        )
      }
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="Entypo"
            size={24}
            name="newsletter"
            style={{ color: tintColor }}
          />
        )
      }
    },
    Wallet: {
      screen: WalletScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
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
