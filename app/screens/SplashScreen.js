import React from 'react';
import { View } from 'react-native';

// components
import Logo from '../components/Logo';
// services
import { getAuthToken } from '../services/auth';
// styles
import styles from '../styles/SplashScreen';

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
