import React from "react";
import { NetInfo } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
// screens
import GetStartedScreen from "../../containers/GetStartedScreen";
import NoNetworkScreen from "../../containers/NoNetworkScreen";
import SplashScreen from "../../containers/SplashScreen";
import TabsScreen from "../../containers/TabsScreen";

const getAppNavigator = (network, auth) => {
  const { connection } = network;
  const { loaded, authUser } = auth;

  const initialRouteName = getInitialScreen(connection, loaded, authUser);

  return createStackNavigator(
    {
      GetStartedScreen: { screen: GetStartedScreen },
      NoNetworkScreen: { screen: NoNetworkScreen },
      SplashScreen: { screen: SplashScreen },
      TabsScreen: { screen: TabsScreen },
    },
    {
      initialRouteName,
      defaultNavigationOptions: {
        header: null
      }
    }
  );
};

const getInitialScreen = (connection, loaded, authUser) => {
  if (!connection || connection.type === "none") {
    return "NoNetworkScreen";
  }

  if (!loaded) {
    return "SplashScreen";
  }

  if (!authUser) {
    return "GetStartedScreen";
  }

  return authUser.profile_updated ? "TabsScreen" : "GetStartedScreen";
};

export default class Main extends React.Component {
  componentWillMount() {
    NetInfo.addEventListener("connectionChange", netInfo => {
      return this.props.handleNetworkChange(netInfo);
    });
  }

  render() {
    const { network, auth } = this.props;

    const AppNavigator = getAppNavigator(network, auth);
    const AppContainer = createAppContainer(AppNavigator);

    return <AppContainer />;
  }
}
