import React from "react";
import { View, NetInfo, StatusBar } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
// screens
import GetStartedScreen from "../../containers/GetStartedScreen";
import NoNetworkScreen from "../../containers/NoNetworkScreen";
import RequestOtpScreen from "../../containers/RequestOtpScreen";
import TabsScreen from "../../containers/TabsScreen";
import UserTypeScreen from "../../containers/UserTypeScreen";
import VerifyOtpScreen from "../../containers/VerifyOtpScreen";

const getAppNavigator = (network, auth) => {
  const initialRouteName = getInitialScreen(network, auth);

  return createStackNavigator(
    {
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
  const { authUser } = auth;

  if (connection && connection.type === "none") {
    return "NoNetworkScreen";
  }

  if (authUser) {
    return authUser.profile_updated ? "TabsScreen" : "UserTypeScreen";
  }

  return "GetStartedScreen";
};

export default class Main extends React.Component {
  componentWillMount() {
    NetInfo.addEventListener("connectionChange", netInfo => {
      return this.props.handleNetworkChange(netInfo);
    });

    setTimeout(() => {
      this.setState({ hideSplash: true });
    }, 1000);
  }

  render() {
    const { network, auth } = this.props;
    const { authInitialized } = auth;

    const AppNavigator = getAppNavigator(network, auth);
    const AppContainer = createAppContainer(AppNavigator);

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#d80402" />
        {authInitialized && <AppContainer />}
      </View>
    );
  }
}
