import React from 'react';
import { StatusBar, NetInfo, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';

// libs
import { client } from './app/libs/apollo';

// screens
import NoNetworkScreen from './app/screens/NoNetworkScreen';
import GetStartedScreen from './app/screens/guest/GetStartedScreen';
import OAuthScreen from './app/screens/guest/OAuthScreen';
import VerifyOtpScreen from './app/screens/guest/VerifyOtpScreen';
import TabScreen from './app/screens/TabScreen';
import UserTypeScreen from './app/screens/auth/UserTypeScreen';
import WalletScreen from './app/screens/auth/WalletScreen';
import NewsDetailScreen from './app/screens/NewsDetailScreen';

// libs
import { getInitialScreen } from './app/services/get_initial_screen';

const createAppStackNavigator = (initialRouteName) => {
  const AppStackNavigator = createStackNavigator(
    {
      GetStartedScreen: { screen: GetStartedScreen },
      OAuthScreen: { screen: OAuthScreen },
      VerifyOtpScreen: { screen: VerifyOtpScreen },
      TabScreen: { screen: TabScreen },
      UserTypeScreen: { screen: UserTypeScreen },
      WalletScreen: { screen: WalletScreen },
      NewsDetailScreen: { screen: NewsDetailScreen },
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
    const screen = await getInitialScreen();

    this.setState({ screen });
  }

  async handleConnectionChanged(connectionInfo) {
    this.setState({ connectionInfo });
  }

  render() {
    const { connectionInfo, screen } = this.state;
    const ready = connectionInfo && screen;

    return (
      <ApolloProvider client={client}>
        <StatusBar backgroundColor="#3498db" barStyle="light-content" />

        {ready && (
          <View style={{ flex: 1 }}>
            {connectionInfo.type === 'none' && <NoNetworkScreen />}
            {connectionInfo.type !== 'none' && createAppStackNavigator(screen)}
          </View>
        )}
      </ApolloProvider>
    );
  }
}
