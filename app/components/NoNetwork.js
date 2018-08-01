import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NoNetwork = () => {
  const text = 'Please, Check your internet connection.';

  return (
    <View style={styles.container}>
      <Text>
        {text}
      </Text>
    </View>
  );
};

export default NoNetwork;
