import React from "react";
import { NetInfo, StatusBar, View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
// screens
import GetStartedScreen from "../../containers/GetStartedScreen";
import NewsDetailScreen from "../../containers/NewsDetailScreen";
import RequestOtpScreen from "../../containers/RequestOtpScreen";
import TabsScreen from "../../containers/TabsScreen";
import UserTypeScreen from "../../containers/UserTypeScreen";
import VerifyOtpScreen from "../../containers/VerifyOtpScreen";

import NoNetwork from "../../components/NoNetwork";

const getAppNavigator = auth => {
  const initialRouteName = getInitialScreen(auth);

  return createStackNavigator(
    {
      GetStartedScreen: { screen: GetStartedScreen },
      TabsScreen: { screen: TabsScreen },
      RequestOtpScreen: { screen: RequestOtpScreen },
      VerifyOtpScreen: { screen: VerifyOtpScreen },
      UserTypeScreen: { screen: UserTypeScreen },
      NewsDetailScreen: { screen: NewsDetailScreen }
    },
    {
      initialRouteName,
      defaultNavigationOptions: {
        header: null
      }
    }
  );
};

const getInitialScreen = auth => {
  const { authUser } = auth;

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
  }

  render() {
    const { network, auth } = this.props;
    const { connection } = network;
    const { authInitialized } = auth;

    const AppNavigator = getAppNavigator(auth);
    const AppContainer = createAppContainer(AppNavigator);

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#d80402" barStyle="light-content" />
        {connection && connection.type === "none" && <NoNetwork />}
        {authInitialized && <AppContainer />}
      </View>
    );
  }
}
