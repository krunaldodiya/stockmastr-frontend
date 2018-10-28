import React from 'react';
import { View } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import theme from '../libs/theme';

const image = require('../../assets/images/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    backgroundColor: theme.background.primary,
  },
  text: {
    fontSize: 28,
    color: 'white',
  },
});

const Logo = () => (
  <View style={styles.container}>
    <Image style={{ width: 150, height: 150 }} source={image} />
  </View>
);

export default Logo;
