import React from "react";
import { ActivityIndicator, NetInfo, StatusBar, View } from "react-native";
import { createStackNavigator } from "react-navigation";

// libs
import { getInitialScreen } from "./app/services/get_initial_screen";

// store
import { StoreProvider } from "./store";

// component
import NoNetwork from "./app/styles/NoNetwork";

// routes

import { routes } from "./routes";

const createAppStackNavigator = initialRouteName => {
  const AppStackNavigator = createStackNavigator(routes, {
    initialRouteName,
    navigationOptions: {
      header: null
    }
  });

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

  handleConnectionChanged = async connectionInfo => {
    this.setState({ connectionInfo });

    if (connectionInfo.type !== "none") {
      const screen = await getInitialScreen();

      this.setState({ screen });
    }
  };

  showLoader = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  render() {
    const { connectionInfo, screen } = this.state;

    return (
      <StoreProvider>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#3498db" barStyle="light-content" />

          {connectionInfo && (
            <View style={{ flex: 1 }}>
              {connectionInfo.type === "none" && <NoNetwork />}

              {connectionInfo.type !== "none" && (
                <View style={{ flex: 1 }}>
                  {screen ? createAppStackNavigator(screen) : this.showLoader()}
                </View>
              )}
            </View>
          )}
        </View>
      </StoreProvider>
    );
  }
}
