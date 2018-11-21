import React from "react";
import { ActivityIndicator, NetInfo, StatusBar, View } from "react-native";
import { createStackNavigator } from "react-navigation";

// libs
// import { getInitialScreen } from "../services/get_initial_screen";

import NoNetwork from "../components/NoNetwork";

import { routes } from "../routes";

import { connect } from "react-redux";

const createAppStackNavigator = initialRouteName => {
  const AppStackNavigator = createStackNavigator(routes, {
    initialRouteName,
    navigationOptions: {
      header: null
    }
  });

  return <AppStackNavigator />;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: null
    };
  }

  async componentWillMount() {
    NetInfo.addEventListener("connectionChange", netInfo => {
      return this.props.handleNetworkChange({
        type: "NETWORK_STATE_CHANGE",
        payload: { connection: netInfo }
      });
    });
  }

  // handleConnectionChanged = async connectionInfo => {
  //   this.setState({ connectionInfo });

  //   if (connectionInfo.type !== "none") {
  //     const screen = await getInitialScreen();

  //     this.setState({ screen });
  //   }
  // };

  showLoader = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  render() {
    const { screen } = this.state;
    const { network } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />

        {network.connection && (
          <View style={{ flex: 1 }}>
            {network.connection.type === "none" && <NoNetwork />}

            {network.connection.type !== "none" && (
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

const mapStateToProps = state => {
  return {
    network: state.network
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleNetworkChange: payload => dispatch(payload)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
