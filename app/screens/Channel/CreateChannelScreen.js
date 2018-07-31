import React from "react";
import { StyleSheet, Platform } from "react-native";
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
  Button,
  Picker,
  Content
} from "native-base";

import theme from "../../libs/theme";

import { compose, graphql } from "react-apollo";
import {
  CREATE_CHANNEL_MUTATION,
  GET_AUTH_USERS_QUERY,
  GET_AUTH_USER_SUBSCRIPTIONS_QUERY
} from "../../graphql";

class CreateChannelScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authUser: null,
      channel: {
        title: null,
        description: null,
        type: "free",
        minimum_calls: null,
        accuracy: "",
        segment: "",
        charge: null,
        trial_days: null
      },
      showChannelType: false
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    const authUser = this.props.getAuthUser.user;
    this.setState({ authUser, loading: false });
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
              ADD CHANNEL
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
              <Input
                style={{
                  paddingLeft: 20,
                  paddingTop: 0,
                  paddingBottom: 0,
                  fontSize: 14
                }}
                onChangeText={title => this.updateData("title", title)}
                underlineColorAndroid="transparent"
                value={this.state.channel.title}
                placeholder="Channel Title"
                returnKeyType="next"
              />
            </Item>

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
                value={this.state.channel.description}
                placeholder="Channel Description"
                returnKeyType="next"
              />
            </Item>

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
                placeholder="Select a Segment"
                selectedValue={this.state.channel.segment}
                onValueChange={segment => this.updateData("segment", segment)}
                textStyle={{ color: "#6a6a6a" }}
              >
                <Picker.Item label="Select a segment" value="" />
                <Picker.Item label="Stock" value="stock" />
                <Picker.Item label="Index" value="index" />
              </Picker>
            </Item>

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
                placeholder="Select Accuracy"
                selectedValue={this.state.channel.accuracy}
                onValueChange={accuracy =>
                  this.updateData("accuracy", accuracy)
                }
                textStyle={{ color: "#6a6a6a" }}
              >
                <Picker.Item label="Select Accuracy" value="" />
                <Picker.Item label="65% to 75%" value="65" />
                <Picker.Item label="75% to 90%" value="75" />
                <Picker.Item label="90% and above" value="90" />
              </Picker>
            </Item>

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
                onChangeText={minimum_calls =>
                  this.updateData("minimum_calls", minimum_calls)
                }
                underlineColorAndroid="transparent"
                value={this.state.channel.minimum_calls}
                placeholder="Minimum Calls (Monthly)"
                keyboardType={
                  Platform.OS === "ios" ? "number-pad" : "phone-pad"
                }
                returnKeyType="next"
              />
            </Item>

            {this.state.showChannelType && (
              <Item
                style={{
                  borderBottomWidth: 0,
                  marginBottom: 10,
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
                    this.state.channel.type == "free" && {
                      backgroundColor: "aquamarine"
                    }
                  ]}
                  onPress={() => this.updateData("type", "free")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "white" },
                      this.state.channel.type == "free" && { color: "black" }
                    ]}
                  >
                    Free
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
                    this.state.channel.type == "paid" && {
                      backgroundColor: "aquamarine"
                    }
                  ]}
                  onPress={() => this.updateData("type", "paid")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "white" },
                      this.state.channel.type == "paid" && { color: "black" }
                    ]}
                  >
                    Paid
                  </Text>
                </Button>
              </Item>
            )}

            {this.state.channel.type == "paid" && (
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
                  onChangeText={charge => this.updateData("charge", charge)}
                  underlineColorAndroid="transparent"
                  value={this.state.channel.charge}
                  placeholder="Charge (Monthly)"
                  keyboardType="number-pad"
                  returnKeyType="next"
                />
              </Item>
            )}

            {this.state.channel.type == "paid" && (
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
                  onChangeText={trial_days =>
                    this.updateData("trial_days", trial_days)
                  }
                  underlineColorAndroid="transparent"
                  value={this.state.channel.trial_days}
                  placeholder="Free Trial (Days)"
                  keyboardType="number-pad"
                  returnKeyType="next"
                />
              </Item>
            )}
          </Content>
        )}
      </Container>
    );
  }

  updateData(key, value) {
    const state = this.state.channel;
    state[key] = value;

    this.setState({ state });
  }

  async addChannel() {
    if (!this.state.channel.title) {
      return alert("Title is required");
    }

    if (!this.state.channel.description) {
      return alert("Description is required");
    }

    if (!this.state.channel.segment) {
      return alert("Segment is required");
    }

    if (!this.state.channel.accuracy) {
      return alert("Accuracy is required");
    }

    if (!this.state.channel.minimum_calls) {
      return alert("Minimum calls is required");
    }

    this.setState({ loading: true });

    // channel
    const channelData = {
      title: this.state.channel.title,
      description: this.state.channel.description,
      owner_id: this.state.authUser.id,
      type: this.state.channel.type,
      segment: this.state.channel.segment,
      minimum_calls: parseInt(this.state.channel.minimum_calls),
      accuracy: parseFloat(this.state.channel.accuracy),
      charge: parseInt(this.state.channel.charge) || 0,
      trial_days: parseInt(this.state.channel.trial_days) || 0
    };

    const addChannel = await this.props.createChannelMutation({
      variables: channelData,
      refetchQueries: [
        {
          query: GET_AUTH_USER_SUBSCRIPTIONS_QUERY
        }
      ]
    });

    if (addChannel) {
      this.props.navigation.replace("ChannelDetailScreen", {
        channel_id: addChannel.data.createChannel.id
      });
    } else {
      this.setState({ loading: false });
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
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUser" }),
  graphql(CREATE_CHANNEL_MUTATION, { name: "createChannelMutation" })
)(CreateChannelScreen);
