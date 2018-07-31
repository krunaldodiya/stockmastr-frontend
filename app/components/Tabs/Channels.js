import React from "react";
import { FlatList } from "react-native";
import {
  View,
  Text,
  Spinner,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right
} from "native-base";
import {httpUrl} from "../../libs/vars";

const moment = require("moment");

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      subscriptions: [],
      loading: true
    };
  }

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const { getAuthUser, getChannelSubscriptionsQuery } = props;

    this.setState({
      authUser: getAuthUser.user,
      subscriptions:
        props.screen == "HomeScreen"
          ? getChannelSubscriptionsQuery.getAuthUserSubscriptions
          : getChannelSubscriptionsQuery.getGuestUserSubscriptions,
      loading: false
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading && (
          <Spinner
            color="#000"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        )}

        {!this.state.loading && (
          <FlatList
            data={this.state.subscriptions}
            renderItem={data => this.showChannelList(data)}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }

  showChannelList(data) {
    const channel = data.item.channel;

    return (
      <ListItem
        avatar
        onPress={() =>
          this.props.navigation.navigate("ChannelDetailScreen", {
            channel_id: channel.id
          })
        }
      >
        <Left>
          <Thumbnail
            source={{
              uri: `${httpUrl}/images/${channel.image}`
            }}
            small
          />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold", marginBottom: 3 }}>
            {channel.title}
          </Text>
          <Text note numberOfLines={1}>
            {channel.description}
          </Text>
        </Body>
        <Right>
          <Text note>{moment(channel.createdAt).format("hh:mm A")}</Text>
        </Right>
      </ListItem>
    );
  }
}

export default Channels;
