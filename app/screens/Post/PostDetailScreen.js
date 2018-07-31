import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Spinner
} from "native-base";

import theme from "../../libs/theme";

import { compose, graphql } from "react-apollo";
import { GET_POST_BY_ID, GET_AUTH_USERS_QUERY } from "../../graphql";

class PostDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      post: null,
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
    const loading = props.getAuthUser.loading || props.getPostById.loading;
    
    this.setState({
      authUser: props.getAuthUser.user,
      post: props.getPostById.post,
      loading
    });
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
            {this.state.post && (
              <Text style={{ color: "white" }} numberOfLines={1}>
                {this.state.post.stock_symbol} ({this.state.post.stock_exchange})
              </Text>
            )}
          </Body>
          <Right>
            <Icon
              type="Ionicons"
              name="md-chatbubbles"
              style={styles.chatIcon}
              onPress={() =>
                this.props.navigation.navigate("CommentScreen", {
                  authUser: this.state.authUser,
                  channel: this.state.post.channel,
                  post: this.state.post
                })
              }
            />
          </Right>
        </Header>
        <View style={styles.container}>
          {this.state.loading && (
            <Spinner
              color="#000"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          )}

          {!this.state.loading && (
            <View>
              <Text style={{ marginBottom: 5, alignContent: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  {this.state.post.stock_name}
                </Text>
                <Text
                  style={{ padding: 10, fontSize: 12, fontWeight: "normal" }}
                >
                  &nbsp;({this.state.post.stock_exchange})
                </Text>
              </Text>
              <Text note style={{ marginBottom: 3, color: "#333" }}>
                {this.state.post.signal.toUpperCase()}:{" "}
                {this.state.post.trigger} | SL: {this.state.post.stoploss} |
                TRGT: {this.state.post.target}
              </Text>
              <Text note># {this.state.post.channel.title}</Text>
            </View>
          )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.background.secondary
  },

  cancelIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  },

  text: {
    color: "black"
  },

  stock_name: {
    color: "black",
    fontSize: 22,
    marginBottom: 10
  },

  chatIcon: {
    padding: 10,
    color: "white",
    fontSize: 22
  }
});

export default compose(
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUser" }),
  graphql(GET_POST_BY_ID, {
    name: "getPostById",
    options: props => {
      return {
        variables: {
          post_id: props.navigation.state.params.post_id
        }
      };
    }
  })
)(PostDetailScreen);
