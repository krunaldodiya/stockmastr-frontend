import React from "react";
import { FlatList } from "react-native";
import { View, Text, Fab, Icon, ListItem, Body, Spinner } from "native-base";

import theme from "../../libs/theme";
import Post from "../Post";

class Feeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      subscriptions: [],
      posts: [],
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
    const {
      getAuthUser,
      getChannelSubscriptionsQuery,
      getAuthUsersPostQuery
    } = props;

    this.setState({
      authUser: getAuthUser.user,
      subscriptions: getChannelSubscriptionsQuery.getAuthUserSubscriptions,
      posts: getAuthUsersPostQuery.getAuthUserPosts,
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
            extraData={this.state}
            data={this.state.posts}
            renderItem={data => <Post {...this.props} post={data.item} channel={data.item.channel} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {!this.state.loading &&
          this.state.authUser.type == "provider" && (
            <Fab
              style={{ backgroundColor: theme.background.primary }}
              onPress={() => this.props.navigation.push("CreatePostScreen")}
              position="bottomRight"
            >
              <Icon type="MaterialIcons" name="add" />
            </Fab>
          )}
      </View>
    );
  }
}

export default Feeds;
