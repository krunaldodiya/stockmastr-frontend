import React from "react";
import { StatusBar, NetInfo, View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "react-navigation";

// screens
import NoNetworkScreen from "./app/screens/NoNetworkScreen";
import GetStartedScreen from "./app/screens/guest/GetStartedScreen";
import OtpAuthScreen from "./app/screens/guest/OtpAuthScreen";
import VerifyOtpScreen from "./app/screens/guest/VerifyOtpScreen";
import TabScreen from "./app/screens/TabScreen";
import UserTypeScreen from "./app/screens/auth/UserTypeScreen";
import AddMoneyScreen from "./app/screens/AddMoneyScreen";
import NewsDetailScreen from "./app/screens/NewsDetailScreen";
import ShareScreen from "./app/screens/ShareScreen";
import TutorialsScreen from "./app/screens/TutorialsScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";

// libs
import { getInitialScreen } from "./app/services/get_initial_screen";
// import { getAuthToken } from "./app/services";

const createAppStackNavigator = initialRouteName => {
  const AppStackNavigator = createStackNavigator(
    {
      GetStartedScreen: { screen: GetStartedScreen },
      OtpAuthScreen: { screen: OtpAuthScreen },
      VerifyOtpScreen: { screen: VerifyOtpScreen },
      TabScreen: { screen: TabScreen },
      UserTypeScreen: { screen: UserTypeScreen },
      AddMoneyScreen: { screen: AddMoneyScreen },
      NewsDetailScreen: { screen: NewsDetailScreen },
      ShareScreen: { screen: ShareScreen },
      TutorialsScreen: { screen: TutorialsScreen },
      FavoritesScreen: { screen: FavoritesScreen }
    },
    {
      initialRouteName,
      navigationOptions: {
        header: null
      }
    }
  );

  return <AppStackNavigator />;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionInfo: null,
      screen: null
    };
  }

  async componentWillMount() {
    NetInfo.addEventListener("connectionChange", connectionInfo =>
      this.handleConnectionChanged(connectionInfo)
    );

    const connectionInfo = await NetInfo.getConnectionInfo();
    this.handleConnectionChanged(connectionInfo);
  }

  async componentDidMount() {
    const screen = await getInitialScreen();
    // const token = await getAuthToken();
    // console.log(token);

    this.setState({ screen });
  }

  handleConnectionChanged = async connectionInfo => {
    this.setState({ connectionInfo });
  };

  showLoader = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  render() {
    const { connectionInfo, screen } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />

        {connectionInfo && (
          <View style={{ flex: 1 }}>
            {connectionInfo.type === "none" && <NoNetworkScreen />}

            {connectionInfo.type !== "none" && (
              <View style={{ flex: 1 }}>
                {screen ? createAppStackNavigator(screen) : this.showLoader()}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
