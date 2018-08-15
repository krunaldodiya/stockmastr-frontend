import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import {
  View,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Tabs,
  Tab,
  List,
  ListItem,
  Thumbnail,
  Content,
  Separator,
  Spinner,
} from 'native-base';

import { compose, graphql } from 'react-apollo';
import { ReactNativeFile } from 'apollo-upload-client';
import theme from '../../libs/theme';
import Channels from '../../components/Tabs/Channels';
import { httpUrl } from '../../libs/vars';

// apollo
import {
  GET_USER_BY_ID,
  GET_AUTH_USERS_QUERY,
  GET_GUEST_USER_SUBSCRIPTIONS_QUERY,
  UPLOAD_USER_AVATAR_MUTATION,
} from '../../graphql';

const ImagePicker = require('react-native-image-picker');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background.secondary,
  },

  cancelIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },

  editIcon: {
    padding: 10,
    color: 'white',
    fontSize: 22,
  },

  chatIcon: {
    padding: 10,
    color: 'white',
    fontSize: 22,
  },

  tabs: {
    backgroundColor: theme.background.primary,
  },

  activeTabs: {
    backgroundColor: theme.background.primary,
  },

  text: {
    color: 'white',
    fontWeight: 'normal',
  },

  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

class UserDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      guestUser: null,
      loading: true,
    };
  }

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const { getAuthUser, getUserById } = props;
    const loading = getAuthUser.loading || getUserById.loading;

    this.setState({
      authUser: getAuthUser.user,
      guestUser: getUserById.user,
      loading,
    });
  }

  async selectUserAvatar() {
    const { guestUser, authUser } = this.state;
    const { uploadUserAvatarMutation } = this.props;

    if (guestUser.id !== authUser.id) return;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) return;

      const file = new ReactNativeFile({
        uri: response.uri,
        type: response.fileName.split('.').pop() === 'jpg' ? 'image/jpeg' : 'image/png',
        name: response.fileName,
      });

      uploadUserAvatarMutation({
        variables: {
          image: file,
          user_id: authUser.id,
        },
        refetchQueries: [
          {
            query: GET_AUTH_USERS_QUERY,
          },
        ],
      });
    });
  }

  render() {
    const { loading, authUser, guestUser } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <Header hasTabs style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => navigation.goBack()}
            />
          </Left>

          <Body>
            <Text style={{ color: 'white' }}>
PROFILE
            </Text>
          </Body>

          {!loading && (
            <Right>
              {guestUser.id !== authUser.id && (
                <Icon
                  type="Ionicons"
                  name="md-chatbubbles"
                  style={styles.chatIcon}
                  onPress={() => navigation.navigate('PrivateChatScreen', {
                    authUser,
                    guestUser,
                  })
                  }
                />
              )}
            </Right>
          )}
        </Header>

        <Tabs initialPage={0}>
          <Tab
            textStyle={styles.text}
            activeTextStyle={styles.activeText}
            tabStyle={styles.tabs}
            activeTabStyle={styles.activeTabs}
            heading="Detail"
          >
            {loading && (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            )}

            {!loading && (
              <Content>
                <List>
                  <ListItem avatar style={{ paddingVertical: 10 }}>
                    <Left>
                      <TouchableOpacity onPress={() => this.selectUserAvatar()}>
                        {guestUser.id === authUser.id && (
                          <Icon
                            type="MaterialIcons"
                            name="camera-alt"
                            style={{
                              position: 'absolute',
                              right: 0,
                              bottom: 0,
                              borderWidth: 1,
                              height: 25,
                              width: 25,
                              padding: 3,
                              zIndex: 1,
                              borderRadius: 20,
                              borderColor: '#000',
                              color: '#000',
                            }}
                          />
                        )}
                        <Thumbnail
                          large
                          source={{
                            uri: `${httpUrl}/images/${guestUser.avatar}`,
                          }}
                        />
                      </TouchableOpacity>
                    </Left>

                    <Body style={{ borderBottomWidth: 0 }}>
                      <Text style={{ fontSize: 26, marginBottom: 5 }}>
                        {guestUser.name}
                      </Text>
                      <Text note>
                        {guestUser.type === 'trader' ? 'Trader' : 'Tips Provider'}
                      </Text>
                    </Body>
                  </ListItem>

                  <Separator bordered>
                    <Text style={{ fontSize: 16 }}>
About
                    </Text>
                  </Separator>

                  <ListItem>
                    <View style={{ flex: 1, marginTop: 5 }}>
                      <Text style={{ fontSize: 17, color: '#333' }}>
Gender
                      </Text>
                      <Text style={{ marginTop: 5, color: 'blue', fontSize: 12 }}>
                        {guestUser.gender.toUpperCase()}
                      </Text>
                    </View>
                  </ListItem>

                  <ListItem>
                    <View style={{ flex: 1, marginTop: 5 }}>
                      <Text style={{ fontSize: 17, color: '#333' }}>
Location
                      </Text>
                      <Text style={{ marginTop: 5, color: 'blue', fontSize: 12 }}>
                        {guestUser.city.toUpperCase()}
,
                        {guestUser.state.toUpperCase()}
                      </Text>
                    </View>
                  </ListItem>
                </List>
              </Content>
            )}
          </Tab>

          <Tab
            textStyle={styles.text}
            activeTextStyle={styles.activeText}
            tabStyle={styles.tabs}
            activeTabStyle={styles.activeTabs}
            heading="Channels"
          >
            {loading && (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            )}
            {!loading && (
              <Channels
                {...this.props}
                screen="UserDetailScreen"
                subscriber_id={guestUser.id}
                showFab={false}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default compose(
  graphql(GET_AUTH_USERS_QUERY, { name: 'getAuthUser' }),
  graphql(GET_USER_BY_ID, {
    name: 'getUserById',
    options: ({ navigation }) => ({
      variables: { user_id: navigation.state.params.user_id },
    }),
  }),
  graphql(GET_GUEST_USER_SUBSCRIPTIONS_QUERY, {
    name: 'getChannelSubscriptionsQuery',
    options: ({ navigation }) => ({
      variables: {
        subscriber_id: navigation.state.params.user_id,
      },
    }),
  }),
  graphql(UPLOAD_USER_AVATAR_MUTATION, {
    name: 'uploadUserAvatarMutation',
  }),
)(UserDetailScreen);
