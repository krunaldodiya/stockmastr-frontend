import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import styles from '../../styles/OAuthScreen';

const background = require('../../../assets/images/background.png');

class OAuthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          resizeMethod="auto"
          blurRadius={10}
          source={background}
        >
          <Text style={styles.text}>
hello
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

export default OAuthScreen;
