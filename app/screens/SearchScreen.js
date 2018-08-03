import React from 'react';
import {
  StyleSheet, View, Text, FlatList, ActivityIndicator, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  Icon,
  Container,
  Header,
  Left,
  Button,
  ListItem,
  Thumbnail,
  Body,
  Right,
} from 'native-base';

// services
import { compose, withApollo, graphql } from 'react-apollo';
import theme from '../libs/theme';

// components
import { SEARCH_CHANNEL_QUERY, GET_AUTH_USERS_QUERY } from '../graphql';
import { httpUrl } from '../libs/vars';

const moment = require('moment');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: theme.background.primary,
  },

  text: {
    padding: 10,
    color: 'white',
    fontSize: 18,
  },

  icon: {
    color: 'white',
    fontSize: 24,
  },

  search: {
    minWidth: 120,
    color: 'white',
  },
});

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      keywords: null,
      loading: true,
    };
  }

  async componentWillMount() {
    this.setState({
      loading: false,
    });
  }

  async showChannels(data) {
    const { navigation } = this.props;
    const channel = data.item;

    return (
      <ListItem
        avatar
        onPress={() => navigation.navigate('ChannelDetailScreen', {
          channel_id: channel.id,
        })
        }
      >
        <Left>
          <Thumbnail
            source={{
              uri: `${httpUrl}/images/${channel.image}`,
            }}
            small
          />
        </Left>
        <Body>
          <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>
            {channel.title}
          </Text>
          <Text note numberOfLines={1}>
            {channel.description}
          </Text>
        </Body>
        <Right>
          <Text note>
            {moment(channel.createdAt).format('hh:mm A')}
          </Text>
        </Right>
      </ListItem>
    );
  }

  async clearSearch() {
    this.setState({
      keywords: null,
      channels: [],
    });
  }

  async loadChannels() {
    this.setState({ loading: true });

    const { client } = this.props;
    const { keywords } = this.state;
    const variables = { keywords };

    client
      .query({
        query: SEARCH_CHANNEL_QUERY,
        variables,
      })
      .then(({ data }) => {
        this.setState({ channels: data.channels, loading: false });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { navigation } = this.props;
    const { keywords, loading, channels } = this.state;

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                onPress={() => navigation.goBack()}
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
              value={keywords}
              onChangeText={string => this.setState({ keywords: string })}
              onSubmitEditing={() => this.loadChannels()}
              clearButtonMode="never"
              underlineColorAndroid="transparent"
              placeholder="Search Channels"
              placeholderTextColor="#E8E8E8"
              autoFocus
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

        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}

          {!loading && (
            <FlatList
              data={channels}
              renderItem={data => this.showChannels(data)}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </Container>
    );
  }
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

export default compose(
  withApollo,
  graphql(GET_AUTH_USERS_QUERY, { name: 'getAuthUserQuery' }),
)(SearchScreen);
