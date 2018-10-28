import React from 'react';
import { StatusBar, NetInfo, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';

// libs
import { client } from './app/libs/apollo';

// screens
import SplashScreen from './app/screens/SplashScreen';
import NoNetworkScreen from './app/screens/NoNetworkScreen';
import GetStartedScreen from './app/screens/guest/GetStartedScreen';
import OAuthScreen from './app/screens/guest/OAuthScreen';

const AppStackNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    GetStartedScreen: { screen: GetStartedScreen },
    OAuthScreen: { screen: OAuthScreen },
  },
  {
    initialRouteName: 'SplashScreen',
    navigationOptions: {
      header: null,
    },
  },
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionInfo: null,
    };
  }

  async componentDidMount() {
    NetInfo.addEventListener('connectionChange', connectionInfo => this.handleConnectionChanged(connectionInfo));
    const connectionInfo = await NetInfo.getConnectionInfo();

    this.handleConnectionChanged(connectionInfo);
  }

  async handleConnectionChanged(connectionInfo) {
    this.setState({ connectionInfo });
  }

  render() {
    const { connectionInfo } = this.state;
    return (
      <ApolloProvider client={client}>
        {connectionInfo && (
          <View style={{ flex: 1 }}>
            <StatusBar
              backgroundColor="transparent"
              barStyle="light-content"
              translucent
              animated
            />

            {connectionInfo.type === 'none' && <NoNetworkScreen />}
            {connectionInfo.type !== 'none' && <AppStackNavigator />}
          </View>
        )}
      </ApolloProvider>
    );
  }
}
