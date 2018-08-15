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

const Home = (props) => {
  const { navigation, getAuthUser } = props;

  return (
    <Menu>
      <MenuTrigger>
        <Icon name="more" style={styles.icon} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption
          onSelect={() => navigation.navigate('UserDetailScreen', {
            user_id: getAuthUser.user.id,
          })
          }
        >
          <Text style={styles.text}>
View Profile
          </Text>
        </MenuOption>

        <MenuOption
          onSelect={() => navigation.navigate('ManageProfileScreen', {
            type: 'navigate',
          })
          }
        >
          <Text style={styles.text}>
Edit Profile
          </Text>
        </MenuOption>

        {getAuthUser.user
          && getAuthUser.user.type === 'Provider' && (
            <MenuOption onSelect={() => navigation.navigate('CreateChannelScreen')}>
              <Text style={styles.text}>
Create a Channel
              </Text>
            </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  );
};

export default Home;
