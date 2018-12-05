import React from "react";
import { NetInfo } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
// screens
import GetStartedScreen from "../../containers/GetStartedScreen";
import NoNetworkScreen from "../../containers/NoNetworkScreen";
import RequestOtpScreen from "../../containers/RequestOtpScreen";
import SplashScreen from "../../containers/SplashScreen";
import TabsScreen from "../../containers/TabsScreen";
import UserTypeScreen from "../../containers/UserTypeScreen";
import VerifyOtpScreen from "../../containers/VerifyOtpScreen";

const getAppNavigator = (network, auth) => {
  const initialRouteName = getInitialScreen(network, auth);

  return createStackNavigator(
    {
      SplashScreen: { screen: SplashScreen },
      GetStartedScreen: { screen: GetStartedScreen },
      NoNetworkScreen: { screen: NoNetworkScreen },
      TabsScreen: { screen: TabsScreen },
      RequestOtpScreen: { screen: RequestOtpScreen },
      VerifyOtpScreen: { screen: VerifyOtpScreen },
      UserTypeScreen: { screen: UserTypeScreen }
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
  const { authInitialized, authUser } = auth;

  if (connection && connection.type === "none") {
    return "NoNetworkScreen";
  }

  if (!authInitialized) {
    return "SplashScreen";
  }

  if (authInitialized) {
    if (authUser) {
      return authUser.profile_updated ? "TabsScreen" : "UserTypeScreen";
    }

    return "GetStartedScreen";
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
