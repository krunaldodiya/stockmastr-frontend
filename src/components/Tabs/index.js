import { Icon, Text, View, Button } from "native-base";
import React from "react";
import Drawer from "react-native-drawer";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
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

const ControlPanel = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ color: "#fff" }}>hello</Text>
    </View>
  );
};

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: "#ff1744"
  }
};

class Tabs extends React.Component {
  componentDidMount() {
    const { news, loadNews } = this.props;

    if (news.loading || news.news.length) {
      return false;
    }

    loadNews();
  }

  render() {
    const AppContainer = createAppContainer(AppTabNavigator);
    const { drawer, toggleDrawer } = this.props;

    return (
      <Drawer
        open={drawer.open}
        onClose={() => toggleDrawer()}
        tapToClose={true}
        type="overlay"
        content={<ControlPanel />}
        openDrawerOffset={0.25}
        styles={drawerStyles}
        tweenHandler={ratio => ({
          main: { opacity: (1.5 - ratio) / 1.5 }
        })}
      >
        <AppContainer />
      </Drawer>
    );
  }
}

export default Tabs;
