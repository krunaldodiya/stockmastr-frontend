import React from "react";
import { StyleSheet, Alert, TouchableOpacity, Platform } from "react-native";
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
  Button
} from "native-base";

import theme from "../../libs/theme";

import { compose, withApollo, graphql } from "react-apollo";
import {
  GET_AUTH_USERS_QUERY,
  CREATE_POST_MUTATION,
  GET_AUTH_USER_CHANNELS_QUERY,
  GET_AUTH_USER_SUBSCRIPTIONS_QUERY,
  GET_AUTH_USERS_POST_QUERY
} from "../../graphql";

import axios from "axios";
import Autocomplete from "react-native-autocomplete-input";

class CreatePostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authUser: null,
      channels: [],
      stocks: [],
      post: {
        channel_id: null,
        description: "",
        signal: "buy",
        trigger: null,
        stoploss: null,
        target: null,
        segment: null,
        stock_exchange: null,
        stock_symbol: null,
        stock_name: null,
        status: "hold"
      }
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const {
      getAuthUser,
      getUserChannelsQuery,
      getChannelSubscriptionsQuery
    } = props;

    const loading =
      getAuthUser.loading ||
      getUserChannelsQuery.loading ||
      getChannelSubscriptionsQuery.loading;

    if (!loading) {
      if (!getUserChannelsQuery.channels.length) {
        return Alert.alert(
          "Oops!",
          "No channels exists.",
          [{ text: "Okay", onPress: () => props.navigation.goBack() }],
          { cancelable: false }
        );
      }

      this.setState({
        authUser: getAuthUser.user,
        channels: getUserChannelsQuery.channels,
        loading
      });
    }
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
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

        {this.state.loading && (
          <Spinner
            color="#000"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}

        {!this.state.loading && (
          <Content
            style={{
              flex: 1,
              backgroundColor: theme.background.secondary,
              padding: 10
            }}
          >
            <Item
              style={{
                width: "100%",
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: "white",
                marginBottom: 5,
                marginLeft: 0
              }}
            >
              <Picker
                placeholder="Select a Channel"
                selectedValue={this.state.post.channel_id}
                onValueChange={channel_id =>
                  this.setSelectedChannel(channel_id)
                }
                textStyle={{ color: "#6a6a6a" }}
              >
                <Picker.Item label="Select a Channel" value={null} />
                {this.state.channels.map((channel, index) => {
                  return (
                    <Picker.Item
                      label={channel.title + `(${channel.segment})`}
                      value={channel.id}
                      key={index}
                    />
                  );
                })}
              </Picker>
            </Item>

            {this.state.post.channel_id && (
              <Item
                style={{ borderBottomWidth: 0, marginBottom: 5, marginLeft: 0 }}
              >
                <Button
                  style={[
                    {
                      flex: 1,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0
                    },
                    this.state.post.stock_exchange == "NSE" && {
                      backgroundColor: "aquamarine"
                    }
                  ]}
                  onPress={() => this.updateData("stock_exchange", "NSE")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "white" },
                      this.state.post.stock_exchange == "NSE" && {
                        color: "black"
                      }
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
                      borderBottomRightRadius: 20
                    },
                    this.state.post.stock_exchange == "BSE" && {
                      backgroundColor: "aquamarine"
                    }
                  ]}
                  onPress={() => this.updateData("stock_exchange", "BSE")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "white" },
                      this.state.post.stock_exchange == "BSE" && {
                        color: "black"
                      }
                    ]}
                  >
                    BSE
                  </Text>
                </Button>
              </Item>
            )}

            {this.state.post.stock_exchange && (
              <Autocomplete
                underlineColorAndroid="transparent"
                style={{
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: "white",
                  padding: 10,
                  margin: 0
                }}
                hideResults={!this.state.stocks.length}
                placeholder="Select a Stock"
                autoCorrect={false}
                data={this.state.stocks}
                defaultValue={this.state.post.stock_name}
                onChangeText={text => this.getSymbols(text)}
                renderItem={item => (
                  <TouchableOpacity onPress={() => this.setSelectedStock(item)}>
                    <Text style={{ padding: 5 }}>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {this.state.post.stock_name && (
              <Item
                style={{
                  borderBottomWidth: 0,
                  marginBottom: 5,
                  marginTop: 5,
                  marginLeft: 0
                }}
              >
                <Button
                  style={[
                    {
                      flex: 1,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0
                    },
                    this.state.post.signal == "buy" && {
                      backgroundColor: "aquamarine"
                    }
                  ]}
                  onPress={() => this.updateData("signal", "buy")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "white" },
                      this.state.post.signal == "buy" && { color: "black" }
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
                      borderBottomRightRadius: 20
                    },
                    this.state.post.signal == "sell" && {
                      backgroundColor: "aquamarine"
                    }
                  ]}
                  onPress={() => this.updateData("signal", "sell")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "white" },
                      this.state.post.signal == "sell" && { color: "black" }
                    ]}
                  >
                    SELL
                  </Text>
                </Button>
              </Item>
            )}

            {this.state.post.stock_name && (
              <Item
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginBottom: 5,
                  marginLeft: 0
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14
                  }}
                  onChangeText={trigger => this.updateData("trigger", trigger)}
                  underlineColorAndroid="transparent"
                  value={this.state.post.trigger}
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "phone-pad"
                  }
                  placeholder={
                    this.state.post.signal == "buy"
                      ? "Buying Price"
                      : "Selling Price"
                  }
                  returnKeyType="next"
                />
              </Item>
            )}

            {this.state.post.stock_name && (
              <Item
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginBottom: 5,
                  marginLeft: 0
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14
                  }}
                  onChangeText={target => this.updateData("target", target)}
                  underlineColorAndroid="transparent"
                  value={this.state.post.target}
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "phone-pad"
                  }
                  placeholder="Target"
                  returnKeyType="next"
                />
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14
                  }}
                  onChangeText={stoploss =>
                    this.updateData("stoploss", stoploss)
                  }
                  underlineColorAndroid="transparent"
                  value={this.state.post.stoploss}
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "phone-pad"
                  }
                  placeholder="Stoploss"
                  returnKeyType="next"
                />
              </Item>
            )}

            {this.state.post.stock_name && (
              <Item
                style={{
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginBottom: 5,
                  marginLeft: 0
                }}
              >
                <Textarea
                  rowSpan={5}
                  style={{
                    paddingLeft: 20,
                    paddingVertical: 20,
                    fontSize: 14,
                    width: "100%"
                  }}
                  onChangeText={description =>
                    this.updateData("description", description)
                  }
                  underlineColorAndroid="transparent"
                  value={this.state.post.description}
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

  setSelectedStock(stock) {
    this.setState({ stocks: [] });

    const state = this.state.post;
    state["stock_symbol"] = stock.symbol;
    state["stock_name"] = stock.description;

    this.setState({ state });
  }

  setSelectedChannel(channel_id) {
    const state = this.state.post;
    const channel = this.state.channels.filter(
      channel => channel.id == channel_id
    )[0];

    state["channel_id"] = channel.id;
    state["segment"] = channel.segment;
    state["stock_exchange"] = "NSE";

    this.setState({ state });
  }

  getSymbols(text) {
    const url = `https://symbol-search.tradingview.com/symbol_search/?text=${text}&type=${
      this.state.post.segment
    }&exchange=${
      this.state.post.stock_exchange
    }&hl=false&lang=en&domain=production`;

    axios
      .get(url, { headers: { Origin: "https://in.tradingview.com" } })
      .then(({ data }) => {
        this.setState({ stocks: data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateData(key, value) {
    const state = this.state.post;
    state[key] = value;

    this.setState({ state });
  }

  async addChannel() {
    if (!this.state.post.channel_id) {
      return alert("Channel is required");
    }

    if (!this.state.post.stock_name) {
      return alert("Stock is required");
    }

    if (!this.state.post.target) {
      return alert("Target is required");
    }

    if (!this.state.post.stoploss) {
      return alert("Stoploss is required");
    }

    this.setState({ loading: true });

    const postData = {
      channel_id: this.state.post.channel_id,
      user_id: this.state.authUser.id,
      description: this.state.post.description,
      signal: this.state.post.signal,
      trigger: parseFloat(this.state.post.trigger),
      stoploss: parseFloat(this.state.post.stoploss),
      target: parseFloat(this.state.post.target),
      segment: this.state.post.segment,
      stock_exchange: this.state.post.stock_exchange,
      stock_symbol: this.state.post.stock_symbol,
      stock_name: this.state.post.stock_name,
      status: this.state.post.status
    };

    const addPost = await this.props.createPostMutation({
      variables: postData,
      refetchQueries: [
        {
          query: GET_AUTH_USERS_POST_QUERY
        }
      ]
    });

    if (addPost) {
      this.props.navigation.replace("PostDetailScreen", {
        post_id: addPost.data.createPost.id
      });
    }
  }
}

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  },

  checkIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  }
});

export default compose(
  withApollo,
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUser" }),
  graphql(GET_AUTH_USER_SUBSCRIPTIONS_QUERY, {
    name: "getChannelSubscriptionsQuery"
  }),
  graphql(GET_AUTH_USER_CHANNELS_QUERY, {
    name: "getUserChannelsQuery",
    options: props => {
      return {
        variables: {
          user_id: props.getAuthUser.user.id
        }
      };
    }
  }),
  graphql(CREATE_POST_MUTATION, { name: "createPostMutation" })
)(CreatePostScreen);
