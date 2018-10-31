import React from 'react';
import { StatusBar, NetInfo, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';

// libs
import { client } from './app/libs/apollo';
// services
import { getAuthToken } from './app/services/auth';

// screens
import SplashScreen from './app/screens/SplashScreen';
import NoNetworkScreen from './app/screens/NoNetworkScreen';
import GetStartedScreen from './app/screens/guest/GetStartedScreen';
import OAuthScreen from './app/screens/guest/OAuthScreen';

const createAppStackNavigator = (initialRouteName) => {
  const AppStackNavigator = createStackNavigator(
    {
      SplashScreen: { screen: SplashScreen },
      GetStartedScreen: { screen: GetStartedScreen },
      OAuthScreen: { screen: OAuthScreen },
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
      screen: authToken ? 'WelcomeScreen' : 'GetStartedScreen',
    });
  }

  async handleConnectionChanged(connectionInfo) {
    this.setState({ connectionInfo });
  }

  render() {
    const { connectionInfo, screen } = this.state;
    return (
      <ApolloProvider client={client}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent animated />

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
