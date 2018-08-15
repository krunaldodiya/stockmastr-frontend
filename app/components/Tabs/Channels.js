import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  View, Text, Spinner, ListItem, Left, Thumbnail, Body, Right,
} from 'native-base';
import { httpUrl } from '../../libs/vars';

const moment = require('moment');

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptions: [],
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
    const { getChannelSubscriptionsQuery, screen } = props;

    this.setState({
      subscriptions:
        screen === 'HomeScreen'
          ? getChannelSubscriptionsQuery.getAuthUserSubscriptions
          : getChannelSubscriptionsQuery.getGuestUserSubscriptions,
      loading: false,
    });
  }

  showChannelList() {
    const { navigation } = this.props;
    const { channel } = this.data.item;

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

  render() {
    const { loading, subscriptions } = this.state;

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
            data={subscriptions}
            renderItem={this.showChannelList}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}

Channels.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

export default Channels;
