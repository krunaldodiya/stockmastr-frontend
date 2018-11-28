import React from "react";
import { NetInfo } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
// screens
import GetStartedScreen from "../../containers/GetStartedScreen";
import NoNetworkScreen from "../../containers/NoNetworkScreen";
import RequestOtpScreen from "../../containers/RequestOtpScreen";
import SplashScreen from "../../containers/SplashScreen";
import TabsScreen from "../../containers/TabsScreen";

const getAppNavigator = (network, auth) => {
  const initialRouteName = getInitialScreen(network, auth);

  return createStackNavigator(
    {
      SplashScreen: { screen: SplashScreen },
      GetStartedScreen: { screen: GetStartedScreen },
      NoNetworkScreen: { screen: NoNetworkScreen },
      TabsScreen: { screen: TabsScreen },
      RequestOtpScreen: { screen: RequestOtpScreen }
    },
    {
      initialRouteName,
      defaultNavigationOptions: {
        header: null
      }
    }
  );
};

const getInitialScreen = (network, auth) => {
  const { connection } = network;
  const { loading, loaded, authUser } = auth;

  if (connection && connection.type === "none") {
    return "NoNetworkScreen";
  }

  if (loading) {
    return "SplashScreen";
  }

  if (loaded) {
    return authUser && authUser.profile_updated
      ? "TabsScreen"
      : "GetStartedScreen";
  }
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
