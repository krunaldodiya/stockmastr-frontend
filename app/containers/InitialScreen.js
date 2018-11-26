import React from "react";
import { ActivityIndicator, NetInfo, StatusBar, View } from "react-native";
import { createStackNavigator } from "react-navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NoNetwork from "../components/NoNetwork";

import { routes } from "../routes";
import { handleNetworkChange } from "../store/actions/handle_network";

const createAppStackNavigator = initialRouteName => {
  const AppStackNavigator = createStackNavigator(routes, {
    initialRouteName,
    navigationOptions: {
      header: null
    }
  });

  return <AppStackNavigator />;
};

class InitialScreen extends React.Component {
  async componentWillMount() {
    NetInfo.addEventListener("connectionChange", netInfo => {
      return this.props.handleNetworkChange(netInfo);
    });
  }

  showLoader = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  getInitialRouteName = auth => {
    const { loaded, authUser } = auth;

    let screen;

    if (loaded && authUser) {
      screen = authUser.profile_updated ? "TabScreen" : "GetStartedScreen";
    } else {
      screen = "GetStartedScreen";
    }

    return screen;
  };

  render() {
    const { network, auth } = this.props;

    console.log(auth);

    const { connection } = network;

    const initialRouteName = this.getInitialRouteName(auth);

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />

        {connection && (
          <View style={{ flex: 1 }}>
            {connection.type === "none" && <NoNetwork />}

            {connection.type !== "none" && (
              <View style={{ flex: 1 }}>
                {auth.loading
                  ? this.showLoader()
                  : createAppStackNavigator(initialRouteName)}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  network: state.network
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { handleNetworkChange: handleNetworkChange },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitialScreen);
