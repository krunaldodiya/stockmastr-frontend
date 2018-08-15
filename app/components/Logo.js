import React from 'react';
import { View, Text } from 'native-base';
import { Image } from 'react-native';
import theme from '../libs/theme';

const image = require('../../Assets/images/logo.png');

const Logo = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: theme.background.primary,
    }}
  >
    <View
      style={{
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
      }}
    >
      <Image style={{ width: 190, height: 150, marginRight: 15 }} source={image} />
    </View>

    <View
      style={{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 28, color: 'white' }}>
SocialStock, Inc
      </Text>
    </View>
  </View>
);

export default Logo;
