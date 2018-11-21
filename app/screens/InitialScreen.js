import React from "react";
import { ActivityIndicator, NetInfo, StatusBar, View } from "react-native";
import { createStackNavigator } from "react-navigation";

import NoNetwork from "../components/NoNetwork";

import { routes } from "../routes";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { handleNetworkChange } from "../store/actions";

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

    return loaded && authUser
      ? authUser.profile_updated
        ? "TabScreen"
        : "GetStartedScreen"
      : "GetStartedScreen";
  };

  render() {
    const { network, auth } = this.props;
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    network: state.network
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleNetworkChange
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
