import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput
} from "react-native";
import {
  Icon,
  Container,
  Header,
  Left,
  Button,
  ListItem,
  Thumbnail,
  Body,
  Right
} from "native-base";

// services
import theme from "../libs/theme";
const moment = require("moment");

// components
import { compose, withApollo, graphql } from "react-apollo";
import { SEARCH_CHANNEL_QUERY, GET_AUTH_USERS_QUERY } from "../graphql";
import {httpUrl} from "../libs/vars";

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      channels: [],
      current_page: 1,
      keywords: null,
      loading: true
    };
  }

  async componentWillMount() {
    this.setState({
      authUser: this.props.getAuthUserQuery.user,
      loading: false
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                style={styles.icon}
                type="MaterialIcons"
                name="arrow-back"
                size={20}
                color="#000"
              />
            </Button>
          </Left>

          <Body>
            <TextInput
              value={this.state.keywords}
              onChangeText={keywords => this.setState({ keywords })}
              onSubmitEditing={() => this.loadChannels()}
              clearButtonMode="never"
              underlineColorAndroid="transparent"
              placeholder="Search Channels"
              placeholderTextColor="#E8E8E8"
              autoFocus={true}
              returnKeyType="search"
              style={styles.search}
            />
          </Body>

          <Right>
            <Button transparent>
              <Icon
                onPress={() => this.clearSearch()}
                style={styles.icon}
                type="MaterialIcons"
                name="cancel"
                size={20}
                color="#000"
              />
            </Button>
          </Right>
        </Header>

        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          {this.state.loading && (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          )}

          {!this.state.loading && (
            <FlatList
              data={this.state.channels}
              renderItem={data => this.showChannels(data)}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </Container>
    );
  }

  showChannels(data) {
    const channel = data.item;

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

  clearSearch() {
    this.setState({
      keywords: null,
      channels: []
    });
  }

  async loadChannels() {
    this.setState({ loading: true });

    this.props.client
      .query({
        query: SEARCH_CHANNEL_QUERY,
        variables: { keywords: this.state.keywords }
      })
      .then(({ data }) => {
        this.setState({ channels: data.channels, loading: false });
      })
      .catch(error => console.log(error));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    backgroundColor: theme.background.primary
  },

  text: {
    padding: 10,
    color: "white",
    fontSize: 18
  },

  icon: {
    color: "white",
    fontSize: 24
  },

  search: {
    minWidth: 120,
    color: "white"
  }
});

export default compose(
  withApollo,
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUserQuery" })
)(SearchScreen);
