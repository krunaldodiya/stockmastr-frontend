import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/NoNetworkScreen';

const NoNetworkScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
Please, Check your internet connection.
    </Text>
  </View>
);

export default NoNetworkScreen;
