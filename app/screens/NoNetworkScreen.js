import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../libs/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NoNetworkScreen = () => {
  const text = 'Please, Check your internet connection.';

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>
        {text}
      </Text>
    </View>
  );
};

export default NoNetworkScreen;
