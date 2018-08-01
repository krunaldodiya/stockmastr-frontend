import React from 'react';
import { StatusBar } from 'react-native';
import { View, Spinner } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { MenuProvider } from 'react-native-popup-menu';

// started config
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// login component
import VerifyOtpScreen from './app/screens/GuestUser/VerifyOtpScreen';
import RequestOtpScreen from './app/screens/GuestUser/RequestOtpScreen';
import UserTypeScreen from './app/screens/GuestUser/UserTypeScreen';
import OauthScreen from './app/screens/GuestUser/OauthScreen';

// user component
import UserDetailScreen from './app/screens/AuthUser/UserDetailScreen';
import ManageProfileScreen from './app/screens/AuthUser/ManageProfileScreen';

// misc component
import HomeScreen from './app/screens/HomeScreen';
import SearchScreen from './app/screens/SearchScreen';

// channel component
import ChannelDetailScreen from './app/screens/Channel/ChannelDetailScreen';
import CreateChannelScreen from './app/screens/Channel/CreateChannelScreen';
import EditChannelScreen from './app/screens/Channel/EditChannelScreen';

// review
import SubmitReviewScreen from './app/screens/Channel/Review/SubmitReviewScreen';
import ReviewScreen from './app/screens/Channel/Review/ReviewScreen';

// post component
import PostDetailScreen from './app/screens/Post/PostDetailScreen';
import CreatePostScreen from './app/screens/Post/CreatePostScreen';
import EditPostScreen from './app/screens/Post/EditPostScreen';
import CommentScreen from './app/screens/Post/CommentScreen';

// chat component
import PrivateChatScreen from './app/screens/Chat/PrivateChatScreen';
import GroupChatScreen from './app/screens/Chat/GroupChatScreen';
import GetStartedScreen from './app/screens/GuestUser/GetStartedScreen';
import NotificationScreen from './app/screens/NotificationScreen';

import { httpUrl, wsUrl } from './app/libs/vars';
import { getAuthToken } from './app/libs/auth';

import theme from './app/libs/theme';

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(createUploadLink({ uri: httpUrl })),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const createAppStackNavigator = (screen) => {
  const AppStackNavigator = createStackNavigator(
    {
      OauthScreen: { screen: OauthScreen },
      RequestOtpScreen: { screen: RequestOtpScreen },
      VerifyOtpScreen: { screen: VerifyOtpScreen },
      UserDetailScreen: { screen: UserDetailScreen },
      UserTypeScreen: { screen: UserTypeScreen },
      ManageProfileScreen: { screen: ManageProfileScreen },
      HomeScreen: { screen: HomeScreen },
      SearchScreen: { screen: SearchScreen },
      ChannelDetailScreen: { screen: ChannelDetailScreen },
      CreateChannelScreen: { screen: CreateChannelScreen },
      EditChannelScreen: { screen: EditChannelScreen },
      PostDetailScreen: { screen: PostDetailScreen },
      CreatePostScreen: { screen: CreatePostScreen },
      EditPostScreen: { screen: EditPostScreen },
      PrivateChatScreen: { screen: PrivateChatScreen },
      GroupChatScreen: { screen: GroupChatScreen },
      CommentScreen: { screen: CommentScreen },
      ReviewScreen: { screen: ReviewScreen },
      SubmitReviewScreen: { screen: SubmitReviewScreen },
      NotificationScreen: { screen: NotificationScreen },
      GetStartedScreen: { screen: GetStartedScreen },
    },
    {
      initialRouteName: screen,
      navigationOptions: {
        header: null,
      },
    },
  );

  return <AppStackNavigator />;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: null,
      loading: true,
    };
  }

  async componentWillMount() {
    const authToken = await getAuthToken();

    this.setState({
      screen: authToken ? 'HomeScreen' : 'GetStartedScreen',
      loading: false,
    });
  }

  render() {
    const { loading, screen } = this.state;

    return (
      <ApolloProvider client={client}>
        <MenuProvider>
          <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.background.primary} barStyle="light-content" />

            {loading ? (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              createAppStackNavigator(screen)
            )}
          </View>
        </MenuProvider>
      </ApolloProvider>
    );
  }
}

export default App;
