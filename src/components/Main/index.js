import React from "react";
import { NetInfo } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
// screens
import GetStartedScreen from "../../containers/GetStartedScreen";
import NoNetworkScreen from "../../containers/NoNetworkScreen";
import SplashScreen from "../../containers/SplashScreen";
import TabsScreen from "../../containers/TabsScreen";
import RequestOtpScreen from "../../containers/RequestOtpScreen";

const getAppNavigator = (network, auth) => {
  const { connection } = network;
  const { loading, authUser } = auth;

  const initialRouteName = getInitialScreen(connection, loading, authUser);

  return createStackNavigator(
    {
      GetStartedScreen: { screen: GetStartedScreen },
      NoNetworkScreen: { screen: NoNetworkScreen },
      SplashScreen: { screen: SplashScreen },
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

const getInitialScreen = (connection, loading, authUser) => {
  if (!loading && (!connection || connection.type === "none")) {
    return "NoNetworkScreen";
  }

  if (loading) {
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
