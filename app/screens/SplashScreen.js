import React from 'react';
import { View, Text } from 'react-native';

// 3rd party
import LottieView from 'lottie-react-native';
// components
import Logo from '../components/Logo';
// services
import { getAuthToken } from '../services/auth';
// styles
import styles from '../styles/SplashScreen';

const badge = require('../../assets/js/badge.json');

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

    setTimeout(() => this.props.navigation.replace(screen), 1000);
  }

  render() {
    // const { visible } = this.state.topBar;

    return (
      <View style={styles.container}>
        {/* <View style={{ flex: 1 }}>
          <Logo />

          {!visible && (
          <Text style={styles.text}>
SocialStock
          </Text>
          )}
        </View> */}

        <LottieView source={badge} autoPlay loop />
      </View>
    );
  }
}
