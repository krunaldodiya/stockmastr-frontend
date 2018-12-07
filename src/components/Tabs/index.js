import { Icon, Text, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import SideMenu from "react-native-side-menu";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import HomeScreen from "../../containers/HomeScreen";
import NewsScreen from "../../containers/NewsScreen";
import NotificationsScreen from "../../containers/NotificationsScreen";
import WalletScreen from "../../containers/WalletScreen";
import theme from "../../libs/theme";

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

class Menu extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fefefe",
          borderRightWidth: 1,
          borderRightColor: "#e6e6e6"
        }}
      >
        <View
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#e6e6e6"
          }}
        >
          <Text
            style={{
              color: "#000",
              fontFamily: theme.fonts.TitilliumWebSemiBold,
              fontSize: 20
            }}
          >
            Menu
          </Text>
        </View>
      </View>
    );
  }
}

class Tabs extends React.Component {
  componentDidMount() {
    const { news, loadNews } = this.props;

    if (news.loading || news.news.length) {
      return false;
    }

    loadNews();
  }

  change = (drawer, toggleDrawer) => {
    if (drawer.isOpen) {
      toggleDrawer({ isOpen: false });
    }
  };

  render() {
    const AppContainer = createAppContainer(AppTabNavigator);
    const { drawer, toggleDrawer } = this.props;

    return (
      <SideMenu
        menu={<Menu />}
        openMenuOffset={Dimensions.get("window").width * 0.75}
        isOpen={drawer.isOpen}
        onChange={() => this.change(drawer, toggleDrawer)}
      >
        <AppContainer />
      </SideMenu>
    );
  }
}

export default Tabs;
