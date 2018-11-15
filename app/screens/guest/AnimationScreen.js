import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-vector-icons';
import styles from '../../styles/OtpAuthScreen';
import Animation from '../../components/Animation';

class AnimationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      favorite: false,
      showAnimation: false,
    };
  }

  showAnimation = () => {
    const { favorite } = this.state;

    if (favorite === false) {
      this.setState({
        showAnimation: true,
      });

      setTimeout(() => {
        this.setState({
          favorite: favorite !== true,
          showAnimation: false,
        });
      }, 1500);
    }

    if (favorite === true) {
      this.setState({
        favorite: false,
      });
    }
  };

  render() {
    const { favorite, showAnimation } = this.state;

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 10,
          }}
        >
          {!showAnimation && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 150,
                left: 165,
              }}
              onPress={() => this.showAnimation()}
            >
              <Icon
                name={favorite ? 'heart' : 'heart-o'}
                color={favorite ? 'red' : 'black'}
                size={32}
              />
            </TouchableOpacity>
          )}

          <View style={{ flex: 1 }}>
            {showAnimation && <Animation />}
          </View>
        </View>
      </View>
    );
  }
}

export default AnimationScreen;
