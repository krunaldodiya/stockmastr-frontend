import React from 'react';
import {
  View, Text, ListItem, Left, Thumbnail, Body, Right,
} from 'native-base';
import { httpUrl } from '../../libs/vars';

const moment = require('moment');

const ChannelSubscriberScreen = (props) => {
  const { navigation, channel_subscription } = props;

  return (
    <ListItem
      avatar
      onPress={() => navigation.navigate('UserDetailScreen', {
        user_id: channel_subscription.subscriber.id,
      })
      }
    >
      <Left>
        <Thumbnail
          small
          source={{
            uri: `${httpUrl}/images/${channel_subscription.subscriber.avatar}`,
          }}
        />
      </Left>
      <Body style={{ borderBottomWidth: 0 }}>
        <Text>
          {channel_subscription.subscriber.name}
        </Text>
        <Text note>
          {channel_subscription.subscriber.city}
,
          {channel_subscription.subscriber.state}
        </Text>
      </Body>
      <Right style={{ borderBottomWidth: 0 }}>
        <View>
          <View>
            <Text note>
              {moment(channel_subscription.createdAt).format('d MMMM, YYYY')}
            </Text>
          </View>
          <View>
            <Text note>
              {moment(channel_subscription.createdAt).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </Right>
    </ListItem>
  );
};

export default ChannelSubscriberScreen;
