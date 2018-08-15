import React from 'react';
import { FlatList } from 'react-native';
import {
  View, Fab, Icon, Spinner,
} from 'native-base';

import theme from '../../libs/theme';
import Post from '../Post';

class Feeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      posts: [],
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
    const { getAuthUser, getAuthUsersPostQuery } = props;

    this.setState({
      authUser: getAuthUser.user,
      posts: getAuthUsersPostQuery.getAuthUserPosts,
      loading: false,
    });
  }

  render() {
    const { loading, posts, authUser } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {loading && (
          <Spinner
            color="#000"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        )}

        {!loading && (
          <FlatList
            extraData={this.state}
            data={posts}
            renderItem={data => (
              <Post {...this.props} post={data.item} channel={data.item.channel} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {!loading
          && authUser.type === 'Provider' && (
            <Fab
              style={{ backgroundColor: theme.background.primary }}
              onPress={() => navigation.push('CreatePostScreen')}
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
