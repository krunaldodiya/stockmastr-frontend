import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Spinner } from "native-base";

// component
import GroupChat from "../../components/Chat/GroupChat";

export default class GroupChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channel: null,
      authUser: null,
      guestUser: null,
      isSubscribed: null,
      loading: true
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    const isSubscribed = this.checkSubscription(
      params.channel_subscriptions,
      params.authUser
    );

    this.setState({
      isSubscribed: isSubscribed ? true : false,
      channel: params.channel,
      authUser: params.authUser,
      loading: false
    });
  }

  checkSubscription(channel_subscriptions, authUser) {
    return channel_subscriptions.filter(
      channel_subscription => channel_subscription.subscriber.id == authUser.id
    )[0];
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && (
          <Spinner
            color="#000"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}

        {!this.state.loading && (
          <View style={{ flex: 1 }}>
            {this.state.channel.type == "paid" &&
              this.state.isSubscribed && (
                <GroupChat
                  {...this.props}
                  channel={this.state.channel}
                  authUser={this.state.authUser}
                />
              )}

            {this.state.channel.type == "free" && (
              <GroupChat
                {...this.props}
                channel={this.state.channel}
                authUser={this.state.authUser}
              />
            )}

            {this.state.channel.type == "paid" &&
              !this.state.isSubscribed && (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "black" }}>
                    Please, Subscribe to start chat.
                  </Text>
                  <Text
                    style={{ color: "blue", marginTop: 10 }}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    Go Back
                  </Text>
                </View>
              )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
