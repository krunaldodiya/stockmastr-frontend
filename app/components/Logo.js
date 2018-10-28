import React from 'react';
import { View, Text } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import theme from '../libs/theme';

const image = require('../../assets/images/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.primary,
  },
  text: {
    fontSize: 28,
    color: 'white',
  },
});

const Logo = props => (
  <View style={styles.container}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
      }}
    >
      <Image style={{ width: 150, height: 150 }} source={image} />
    </View>

    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!props.keyboardVisible && (
      <Text style={styles.text}>
SocialStock
      </Text>
      )}
    </View>
  </View>
);

export default Logo;
