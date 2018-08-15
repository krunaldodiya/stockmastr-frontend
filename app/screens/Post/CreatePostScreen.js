import React from 'react';
import {
  StyleSheet, Alert, TouchableOpacity, Platform,
} from 'react-native';

import {
  Text,
  Input,
  Container,
  Item,
  Icon,
  Header,
  Left,
  Body,
  Right,
  Textarea,
  Spinner,
  Picker,
  Content,
  Button,
} from 'native-base';

import { compose, withApollo, graphql } from 'react-apollo';

import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';
import {
  GET_AUTH_USERS_QUERY,
  CREATE_POST_MUTATION,
  GET_AUTH_USER_CHANNELS_QUERY,
  GET_AUTH_USER_SUBSCRIPTIONS_QUERY,
  GET_AUTH_USERS_POST_QUERY,
} from '../../graphql';
import theme from '../../libs/theme';

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },

  checkIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },
});

class CreatePostScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authUser: null,
      channels: [],
      stocks: [],
      post: {
        channel_id: null,
        description: '',
        signal: 'buy',
        trigger: null,
        stoploss: null,
        target: null,
        segment: null,
        stock_exchange: null,
        stock_symbol: null,
        stock_name: null,
        status: 'hold',
      },
    };
  }

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  setSelectedStock = (stock) => {
    this.setState({ stocks: [] });

    const { post } = this.state;

    post.stock_symbol = stock.symbol;
    post.stock_name = stock.description;

    this.setState({ post });
  };

  setSelectedChannel = (channelId) => {
    const { post } = this.state;
    const channel = post.channels.filter(postChannel => postChannel.id === channelId)[0];

    post.channel_id = channel.id;
    post.segment = channel.segment;
    post.stock_exchange = 'NSE';

    this.setState({ post });
  };

  getSymbols = (text) => {
    const { post } = this.state;
    const url = `https://symbol-search.tradingview.com/symbol_search/?text=${text}&type=${
      post.segment
    }&exchange=${post.stock_exchange}&hl=false&lang=en&domain=production`;

    axios
      .get(url, { headers: { Origin: 'https://in.tradingview.com' } })
      .then(({ data }) => {
        this.setState({ stocks: data });
      })
      .catch((e) => {
        Alert.alert(e);
      });
  };

  init = (props) => {
    const { getAuthUser, getUserChannelsQuery, getChannelSubscriptionsQuery } = props;
    const loading = getAuthUser.loading || getUserChannelsQuery.loading || getChannelSubscriptionsQuery.loading;

    if (!loading) {
      if (!getUserChannelsQuery.channels.length) {
        Alert.alert(
          'Oops!',
          'No channels exists.',
          [{ text: 'Okay', onPress: () => props.navigation.goBack() }],
          { cancelable: false },
        );
      }

      if (getUserChannelsQuery.channels.length) {
        this.setState({
          authUser: getAuthUser.user,
          channels: getUserChannelsQuery.channels,
          loading,
        });
      }
    }
  };

  updateData = (key, value) => {
    const { post } = this.state;
    post[key] = value;

    this.setState({ post });
  };

  addChannel = () => {
    const { post, authUser } = this.state;
    const { navigation, createPostMutation } = this.props;

    if (!post.channel_id) {
      return Alert.alert('Channel is required');
    }

    if (!post.stock_name) {
      return Alert.alert('Stock is required');
    }

    if (!post.target) {
      return Alert.alert('Target is required');
    }

    if (!post.stoploss) {
      return Alert.alert('Stoploss is required');
    }

    this.setState({ loading: true });

    const postData = {
      channel_id: post.channel_id,
      user_id: authUser.id,
      description: post.description,
      signal: post.signal,
      trigger: parseFloat(post.trigger),
      stoploss: parseFloat(post.stoploss),
      target: parseFloat(post.target),
      segment: post.segment,
      stock_exchange: post.stock_exchange,
      stock_symbol: post.stock_symbol,
      stock_name: post.stock_name,
      status: post.status,
    };

    const addPost = createPostMutation({
      variables: postData,
      refetchQueries: [
        {
          query: GET_AUTH_USERS_POST_QUERY,
        },
      ],
    });

    return addPost.then(() => {
      navigation.replace('PostDetailScreen', {
        post_id: addPost.data.createPost.id,
      });
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      loading, post, stocks, channels,
    } = this.state;

    return (
      <Container>
        <Header style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
PLACE CALL
            </Text>
          </Body>
          <Right>
            <Icon
              type="MaterialIcons"
              name="check"
              style={styles.checkIcon}
              onPress={() => this.addChannel()}
            />
          </Right>
        </Header>

        {loading && (
          <Spinner
            color="#000"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        )}

        {!loading && (
          <Content
            style={{
              flex: 1,
              backgroundColor: theme.background.secondary,
              padding: 10,
            }}
          >
            <Item
              style={{
                width: '100%',
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: 'white',
                marginBottom: 5,
                marginLeft: 0,
              }}
            >
              <Picker
                placeholder="Select a Channel"
                selectedValue={post.channel_id}
                onValueChange={channelId => this.setSelectedChannel(channelId)}
                textStyle={{ color: '#6a6a6a' }}
              >
                <Picker.Item label="Select a Channel" value={null} />
                {channels.map((channel, index) => (
                  <Picker.Item
                    label={`${channel.title}(${channel.segment})`}
                    value={channel.id}
                    key={index.toString()}
                  />
                ))}
              </Picker>
            </Item>

            {post.channel_id && (
              <Item style={{ borderBottomWidth: 0, marginBottom: 5, marginLeft: 0 }}>
                <Button
                  style={[
                    {
                      flex: 1,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    post.stock_exchange === 'NSE' && {
                      backgroundColor: 'aquamarine',
                    },
                  ]}
                  onPress={() => this.updateData('stock_exchange', 'NSE')}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: 'white' },
                      post.stock_exchange === 'NSE' && {
                        color: 'black',
                      },
                    ]}
                  >
                    NSE
                  </Text>
                </Button>
                <Button
                  style={[
                    {
                      flex: 1,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                    },
                    post.stock_exchange === 'BSE' && {
                      backgroundColor: 'aquamarine',
                    },
                  ]}
                  onPress={() => this.updateData('stock_exchange', 'BSE')}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: 'white' },
                      post.stock_exchange === 'BSE' && {
                        color: 'black',
                      },
                    ]}
                  >
                    BSE
                  </Text>
                </Button>
              </Item>
            )}

            {post.stock_exchange && (
              <Autocomplete
                underlineColorAndroid="transparent"
                style={{
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: 'white',
                  padding: 10,
                  margin: 0,
                }}
                hideResults={!stocks.length}
                placeholder="Select a Stock"
                autoCorrect={false}
                data={stocks}
                defaultValue={post.stock_name}
                onChangeText={text => this.getSymbols(text)}
                renderItem={item => (
                  <TouchableOpacity onPress={() => this.setSelectedStock(item)}>
                    <Text style={{ padding: 5 }}>
                      {item.description}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {post.stock_name && (
              <Item
                style={{
                  borderBottomWidth: 0,
                  marginBottom: 5,
                  marginTop: 5,
                  marginLeft: 0,
                }}
              >
                <Button
                  style={[
                    {
                      flex: 1,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                    post.signal === 'buy' && {
                      backgroundColor: 'aquamarine',
                    },
                  ]}
                  onPress={() => this.updateData('signal', 'buy')}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: 'white' },
                      post.signal === 'buy' && { color: 'black' },
                    ]}
                  >
                    BUY
                  </Text>
                </Button>
                <Button
                  style={[
                    {
                      flex: 1,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                    },
                    post.signal === 'sell' && {
                      backgroundColor: 'aquamarine',
                    },
                  ]}
                  onPress={() => this.updateData('signal', 'sell')}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: 'white' },
                      post.signal === 'sell' && { color: 'black' },
                    ]}
                  >
                    SELL
                  </Text>
                </Button>
              </Item>
            )}

            {post.stock_name && (
              <Item
                style={{
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  marginBottom: 5,
                  marginLeft: 0,
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14,
                  }}
                  onChangeText={trigger => this.updateData('trigger', trigger)}
                  underlineColorAndroid="transparent"
                  value={post.trigger}
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
                  placeholder={post.signal === 'buy' ? 'Buying Price' : 'Selling Price'}
                  returnKeyType="next"
                />
              </Item>
            )}

            {post.stock_name && (
              <Item
                style={{
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  marginBottom: 5,
                  marginLeft: 0,
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14,
                  }}
                  onChangeText={target => this.updateData('target', target)}
                  underlineColorAndroid="transparent"
                  value={post.target}
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
                  placeholder="Target"
                  returnKeyType="next"
                />
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14,
                  }}
                  onChangeText={stoploss => this.updateData('stoploss', stoploss)}
                  underlineColorAndroid="transparent"
                  value={post.stoploss}
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
                  placeholder="Stoploss"
                  returnKeyType="next"
                />
              </Item>
            )}

            {post.stock_name && (
              <Item
                style={{
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  marginBottom: 5,
                  marginLeft: 0,
                }}
              >
                <Textarea
                  rowSpan={5}
                  style={{
                    paddingLeft: 20,
                    paddingVertical: 20,
                    fontSize: 14,
                    width: '100%',
                  }}
                  onChangeText={description => this.updateData('description', description)}
                  underlineColorAndroid="transparent"
                  value={post.description}
                  placeholder="Technical/Fundamental Description (optional)"
                  returnKeyType="next"
                />
              </Item>
            )}
          </Content>
        )}
      </Container>
    );
  }
}

export default compose(
  withApollo,
  graphql(GET_AUTH_USERS_QUERY, { name: 'getAuthUser' }),
  graphql(GET_AUTH_USER_SUBSCRIPTIONS_QUERY, {
    name: 'getChannelSubscriptionsQuery',
  }),
  graphql(GET_AUTH_USER_CHANNELS_QUERY, {
    name: 'getUserChannelsQuery',
    options: ({ getAuthUser }) => ({
      variables: {
        user_id: getAuthUser.user.id,
      },
    }),
  }),
  graphql(CREATE_POST_MUTATION, { name: 'createPostMutation' }),
)(CreatePostScreen);
