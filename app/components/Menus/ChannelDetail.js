import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Text } from 'native-base';

import {
  Menu, MenuOptions, MenuOption, MenuTrigger,
} from 'react-native-popup-menu';

const styles = StyleSheet.create({
  text: {
    padding: 5,
  },

  icon: {
    color: 'white',
    padding: 5,
  },
});

const ChannelDetail = (props) => {
  const { navigation, getAuthUser, getChannelById } = props;

  return (
    <Menu>
      <MenuTrigger>
        <Icon name="more" style={styles.icon} />
      </MenuTrigger>

      <MenuOptions>
        <MenuOption
          onSelect={() => navigation.navigate('EditChannelScreen', {
            type: 'navigate',
          })
          }
        >
          <Text style={styles.text}>
Edit Channel
          </Text>
        </MenuOption>

        {getAuthUser.user
          && getAuthUser.user.type === 'Provider' && (
            <MenuOption
              onSelect={() => navigation.navigate('SubmitReviewScreen', {
                channel_id: getChannelById.channel.id,
              })
              }
            >
              <Text style={styles.text}>
Submit Review
              </Text>
            </MenuOption>
        )}

        {getAuthUser.user
          && getAuthUser.user.type === 'Provider' && (
            <MenuOption
              onSelect={() => navigation.navigate('ChannelSubscriberScreen', {
                channel_id: getChannelById.channel.id,
              })
              }
            >
              <Text style={styles.text}>
Channel Subscribers
              </Text>
            </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default ChannelDetail;
