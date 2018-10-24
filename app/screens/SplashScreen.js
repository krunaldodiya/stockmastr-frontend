import React from 'react';
import { View, StyleSheet } from 'react-native';

import { theme } from '../libs/theme';

// components
import Logo from '../components/Logo';

import { getAuthToken } from '../services/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.primary,
  },
});

export default class SplashScreen extends React.Component {
  static options() {
    return {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
      },
    };
  }

  async componentDidMount() {
    const authToken = await getAuthToken();
    const screen = authToken ? 'WelcomeScreen' : 'GetStartedScreen';

    setTimeout(() => this.props.navigation.replace(screen), 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2 }}>
          <Logo keyboardVisible={false} />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
