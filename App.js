import React from 'react';
import { StatusBar, NetInfo, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';

// libs
import { client } from './app/libs/apollo';
// services
import { getAuthToken } from './app/services/auth';

// screens
import NoNetworkScreen from './app/screens/NoNetworkScreen';
import GetStartedScreen from './app/screens/guest/GetStartedScreen';
import OAuthScreen from './app/screens/guest/OAuthScreen';
import VerifyOtpScreen from './app/screens/guest/VerifyOtpScreen';
import HomeScreen from './app/screens/auth/HomeScreen';

const createAppStackNavigator = (initialRouteName) => {
  const AppStackNavigator = createStackNavigator(
    {
      GetStartedScreen: { screen: GetStartedScreen },
      OAuthScreen: { screen: OAuthScreen },
      VerifyOtpScreen: { screen: VerifyOtpScreen },
      HomeScreen: { screen: HomeScreen },
    },
    {
      initialRouteName,
      navigationOptions: {
        header: null,
      },
    },
  );

  return <AppStackNavigator />;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionInfo: null,
      screen: null,
    };
  }

  async componentWillMount() {
    NetInfo.addEventListener('connectionChange', connectionInfo => this.handleConnectionChanged(connectionInfo));
    const connectionInfo = await NetInfo.getConnectionInfo();

    this.handleConnectionChanged(connectionInfo);
  }

  async componentDidMount() {
    const authToken = await getAuthToken();

    this.setState({
      screen: authToken ? 'HomeScreen' : 'GetStartedScreen',
    });
  }

  async handleConnectionChanged(connectionInfo) {
    this.setState({ connectionInfo });
  }

  render() {
    const { connectionInfo, screen } = this.state;
    return (
      <ApolloProvider client={client}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />

        {connectionInfo && (
          <View style={{ flex: 1 }}>
            {connectionInfo.type === 'none' && <NoNetworkScreen />}
            {connectionInfo.type !== 'none' && createAppStackNavigator(screen)}
          </View>
        )}
      </ApolloProvider>
    );
  }
}
