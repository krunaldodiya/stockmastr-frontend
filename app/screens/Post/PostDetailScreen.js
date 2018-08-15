import React from 'react';
import { StyleSheet } from 'react-native';

import {
  View, Text, Container, Header, Left, Icon, Body, Right, Spinner,
} from 'native-base';

import { compose, graphql } from 'react-apollo';
import theme from '../../libs/theme';

import { GET_POST_BY_ID, GET_AUTH_USERS_QUERY } from '../../graphql';

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

  text: {
    color: 'black',
  },

  stock_name: {
    color: 'black',
    fontSize: 22,
    marginBottom: 10,
  },

  chatIcon: {
    padding: 10,
    color: 'white',
    fontSize: 22,
  },
});

class PostDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      post: null,
      loading: true,
    };
  }

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const { getAuthUser, getPostById } = props;
    const loading = getAuthUser.loading || getPostById.loading;

    this.setState({
      authUser: getAuthUser.user,
      post: getPostById.post,
      loading,
    });
  }

  render() {
    const { navigation } = this.props;
    const { post, authUser, loading } = this.state;

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
            {post && (
              <Text style={{ color: 'white' }} numberOfLines={1}>
                {post.stock_symbol}
                {' '}
(
                {post.stock_exchange}
)
              </Text>
            )}
          </Body>
          <Right>
            <Icon
              type="Ionicons"
              name="md-chatbubbles"
              style={styles.chatIcon}
              onPress={() => navigation.navigate('CommentScreen', {
                authUser,
                channel: post.channel,
                post,
              })
              }
            />
          </Right>
        </Header>
        <View style={styles.container}>
          {loading && (
            <Spinner
              color="#000"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}

          {!loading && (
            <View>
              <Text style={{ marginBottom: 5, alignContent: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {post.stock_name}
                </Text>
                <Text style={{ padding: 10, fontSize: 12, fontWeight: 'normal' }}>
                  &nbsp;(
                  {post.stock_exchange}
)
                </Text>
              </Text>
              <Text note style={{ marginBottom: 3, color: '#333' }}>
                {post.signal.toUpperCase()}
:
                {post.trigger}
                {' '}
| SL:
                {post.stoploss}
                {' '}
| TRGT:
                {post.target}
              </Text>
              <Text note>
#
                {post.channel.title}
              </Text>
            </View>
          )}
        </View>
      </Container>
    );
  }
}

export default compose(
  graphql(GET_AUTH_USERS_QUERY, { name: 'getAuthUser' }),
  graphql(GET_POST_BY_ID, {
    name: 'getPostById',
    options: ({ navigation }) => ({
      variables: {
        post_id: navigation.state.params.post_id,
      },
    }),
  }),
)(PostDetailScreen);
