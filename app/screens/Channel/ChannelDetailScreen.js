import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
  Spinner,
  Button,
} from 'native-base';
import { Rating } from 'react-native-ratings';

import { compose, withApollo, graphql } from 'react-apollo';
import { ReactNativeFile } from 'apollo-upload-client/lib/main';
import theme from '../../libs/theme';

// apollo
import {
  GET_CHANNEL_BY_ID,
  SUBSCRIBE_TO_CHANNEL_MUTATION,
  UNSUBSCRIBE_FROM_CHANNEL_MUTATION,
  GET_AUTH_USERS_QUERY,
  GET_CHANNEL_SUBSCRIPTIONS_QUERY,
  GET_AUTH_USER_SUBSCRIPTIONS_QUERY,
  UPLOAD_CHANNEL_PICTURE_MUTATION,
} from '../../graphql';

import Post from '../../components/Post';
import ChannelDetail from '../../components/Menus/ChannelDetail';
import { httpUrl } from '../../libs/vars';

const moment = require('moment');
const ImagePicker = require('react-native-image-picker');

class ChannelDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authUser: null,
      channel: null,
      channel_subscriptions: [],
      subscription_status: {
        processing: false,
      },
    };
  }

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const loading = props.getAuthUser.loading
      || props.getChannelById.loading
      || props.getChannelSubscriptionsQuery.loading;

    this.setState({
      authUser: props.getAuthUser.user,
      channel: props.getChannelById.channel,
      channel_subscriptions: props.getChannelSubscriptionsQuery.getChannelSubscriptions,
      loading,
    });
  }

  render() {
    return (
      <Container>
        <Header hasTabs style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>

          <Body>
            <Text style={{ color: 'white' }} numberOfLines={1}>
              {this.state.channel && (
                <Text style={{ color: 'white' }} numberOfLines={1}>
                  {this.state.channel.title}
                </Text>
              )}
            </Text>
          </Body>

          <Right>
            <Button transparent>
              <Icon
                type="Ionicons"
                name="md-chatbubbles"
                style={styles.chatIcon}
                onPress={() => this.props.navigation.navigate('GroupChatScreen', {
                  authUser: this.state.authUser,
                  channel: this.state.channel,
                  channel_subscriptions: this.state.channel_subscriptions,
                })
                }
              />
            </Button>

            <Button transparent>
              {this.state.channel && <ChannelDetail {...this.props} />}
            </Button>
          </Right>
        </Header>

        <Tabs initialPage={0} onChangeTab={tab => this.setState({ currentTab: tab.i })}>
          <Tab
            textStyle={styles.text}
            activeTextStyle={styles.activeText}
            tabStyle={styles.tabs}
            activeTabStyle={styles.activeTabs}
            heading="Detail"
          >
            {this.state.loading && (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            )}

            {!this.state.loading && (
              <Content>
                <List>
                  <ListItem avatar style={{ paddingVertical: 10 }}>
                    <Left>
                      <TouchableOpacity onPress={() => this.selectChannelImage()}>
                        {this.state.channel.owner.id == this.state.authUser.id && (
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
                            uri: `${httpUrl}/images/${this.state.channel.image}`,
                          }}
                        />
                      </TouchableOpacity>
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }}>
                      <Text numberOfLines={1} style={{ fontSize: 18, marginBottom: 2 }}>
                        {this.state.channel.title.toUpperCase()}
                      </Text>
                      <Text note numberOfLines={1} style={{ fontSize: 12, marginBottom: 5 }}>
                        {this.state.channel.description.toUpperCase()}
                      </Text>

                      <View style={{ flexDirection: 'row' }}>
                        <Rating
                          type="star"
                          ratingCount={5}
                          fractions={2}
                          startingValue={3.5}
                          ratingBackgroundColor="transparent"
                          imageSize={20}
                          readonly
                          onFinishRating={this.ratingCompleted}
                          style={{ paddingVertical: 5 }}
                        />

                        <Text style={{ fontSize: 14, marginTop: 6, marginLeft: 10 }}>
                          <Text note>
3.5/5
                          </Text>
                          &nbsp;
                          <Text note>
(25)
                          </Text>
                        </Text>
                      </View>
                    </Body>
                  </ListItem>

                  <ListItem>
                    <View style={{ flex: 1, marginTop: 5 }}>
                      <View style={{ marginBottom: 20 }}>
                        <Text>
Rank: #5
                        </Text>
                        <Text note>
Rank is given based on accuracy & ratings.
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text style={{ fontSize: 17, color: '#333' }}>
Subscribers
                        </Text>
                        {this.getSubscriptionButton()}
                      </View>

                      <FlatList
                        style={{ marginTop: 15 }}
                        extraData={this.state}
                        data={this.state.channel_subscriptions}
                        renderItem={data => this.showChannelSubscribers(data)}
                        keyExtractor={(item, index) => index.toString()}
                      />
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
            heading="Posts"
          >
            {this.state.loading && (
              <Spinner
                color="#000"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            )}

            {!this.state.loading
              && this.checkSubscription() && (
                <FlatList
                  extraData={this.state}
                  data={this.state.channel.posts}
                  renderItem={data => (
                    <Post {...this.props} post={data.item} channel={this.state.channel} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
            )}

            {!this.state.loading
              && !this.checkSubscription() && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>
Please, Subscribe to access
                  </Text>
                </View>
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }

  showChannelSubscribers(data) {
    const channel_subscription = data.item;

    return (
      <ListItem
        avatar
        onPress={() => this.props.navigation.navigate('UserDetailScreen', {
          user_id: channel_subscription.subscriber.id,
        })
        }
      >
        <Left>
          <Thumbnail
            small
            source={{
              uri: `${httpUrl}/images/${channel_subscription.subscriber.avatar}`,
            }}
          />
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>
            {channel_subscription.subscriber.name}
          </Text>
          <Text note>
            {channel_subscription.subscriber.city}
,
            {channel_subscription.subscriber.state}
          </Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <View>
            <View>
              <Text note>
                {moment(channel_subscription.createdAt).format('d MMMM, YYYY')}
              </Text>
            </View>
            <View>
              <Text note>
                {moment(channel_subscription.createdAt).format('hh:mm A')}
              </Text>
            </View>
          </View>
        </Right>
      </ListItem>
    );
  }

  checkSubscription() {
    return this.state.channel_subscriptions.filter(
      channel_subscription => channel_subscription.subscriber.id == this.state.authUser.id,
    )[0];
  }

  getSubscriptionButton() {
    const isOwner = this.state.authUser.id == this.state.channel.owner.id;
    const isProcessing = this.state.subscription_status.processing;
    const subscription = this.checkSubscription();

    return (
      <Button
        iconLeft
        small
        style={{ backgroundColor: subscription ? 'green' : 'gray' }}
        disabled={isOwner || isProcessing}
        onPress={() => (subscription
          ? this.unsubscribeChannel(this.state.channel, subscription)
          : this.subscribeChannel(this.state.channel, subscription))
        }
      >
        <Icon type="MaterialIcons" name={subscription ? 'check' : 'add'} />
        {isOwner ? (
          <Text>
owner
          </Text>
        ) : (
          <Text>
            {subscription ? 'subscribed' : 'subscribe'}
          </Text>
        )}
      </Button>
    );
  }

  async selectChannelImage() {
    const { channel, authUser } = this.state;
    const { uploadChannelPictureMutation } = this.props;

    if (channel.owner.id !== authUser.id) return;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    console.log('', ImagePicker);

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) return;

      const file = new ReactNativeFile({
        uri: response.uri,
        type: response.fileName.split('.').pop() === 'jpg' ? 'image/jpeg' : 'image/png',
        name: response.fileName,
      });

      uploadChannelPictureMutation({
        variables: {
          image: file,
          channel_id: channel.id,
        },
        refetchQueries: [
          {
            query: GET_CHANNEL_BY_ID,
            variables: {
              channel_id: channel.id,
            },
          },
        ],
      });
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  async unsubscribeChannel(channel, subscription) {
    const { unsubscribeFromChannelMutation } = this.props;

    this.setState({
      subscription_status: {
        processing: true,
        type: 'unsubscribe',
        subscription_id: subscription.id,
      },
    });

    unsubscribeFromChannelMutation({
      variables: { subscription_id: subscription.id },
      refetchQueries: [
        {
          query: GET_CHANNEL_SUBSCRIPTIONS_QUERY,
          variables: {
            channel_id: channel.id,
          },
        },
        {
          query: GET_AUTH_USER_SUBSCRIPTIONS_QUERY,
        },
      ],
    })
      .then(() => {
        this.setState({
          subscription_status: {
            processing: false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async subscribeChannel(channel, subscription) {
    this.setState({
      subscription_status: {
        processing: true,
        type: 'subscribe',
        channel_id: channel.id,
      },
    });

    this.props
      .subscribeToChannelMutation({
        variables: {
          channel_id: channel.id,
          subscriber_id: this.state.authUser.id,
          status: 'active',
        },
        refetchQueries: [
          {
            query: GET_CHANNEL_SUBSCRIPTIONS_QUERY,
            variables: {
              channel_id: channel.id,
            },
          },
          {
            query: GET_AUTH_USER_SUBSCRIPTIONS_QUERY,
          },
        ],
      })
      .then((data) => {
        this.setState({
          subscription_status: {
            processing: false,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

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

export default compose(
  withApollo,
  graphql(GET_AUTH_USERS_QUERY, { name: 'getAuthUser' }),
  graphql(GET_CHANNEL_BY_ID, {
    name: 'getChannelById',
    options: props => ({
      variables: {
        channel_id: props.navigation.state.params.channel_id,
      },
    }),
  }),
  graphql(GET_CHANNEL_SUBSCRIPTIONS_QUERY, {
    name: 'getChannelSubscriptionsQuery',
    options: props => ({
      variables: {
        channel_id: props.navigation.state.params.channel_id,
      },
    }),
  }),
  graphql(SUBSCRIBE_TO_CHANNEL_MUTATION, {
    name: 'subscribeToChannelMutation',
  }),
  graphql(UNSUBSCRIBE_FROM_CHANNEL_MUTATION, {
    name: 'unsubscribeFromChannelMutation',
  }),
  graphql(UPLOAD_CHANNEL_PICTURE_MUTATION, {
    name: 'uploadChannelPictureMutation',
  }),
)(ChannelDetailScreen);
