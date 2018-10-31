import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// import Expo from 'expo';
import axios from 'axios';

import { Icon } from 'react-native-vector-icons';
import styles from '../../styles/OAuthScreen';
import Animation from '../../components/Animation';

class OAuthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      favorite: false,
      showAnimation: false,
    };
  }

  setUSer = async (data) => {
    const { name, email } = data;

    this.setState({
      user: {
        name,
        email,
      },
    });
  };

  // loginWithGoogle = async () => {
  //   const { user } = await Expo.Google.logInAsync({
  //     androidClientId: '700045608007-2sconl7ioipu1s6l6j3os3fpqa8suvd5.apps.googleusercontent.com',
  //     iosClientId: '700045608007-77iit7ov1thbbcmr2olfmsf1a2ategh7.apps.googleusercontent.com',
  //     scopes: ['profile', 'email'],
  //   });

  //   this.setUSer(user);
  // };

  // loginWithFacebook = async () => {
  //   const { token, type } = await Expo.Facebook.logInWithReadPermissionsAsync('1941481456155598', {
  //     permissions: ['public_profile', 'email'],
  //   });

  //   if (type == 'success') {
  //     const { data } = await axios.get(
  //       `https://graph.facebook.com/v2.12/me?fields=name,first_name,last_name,email&access_token=${token}`,
  //     );

  //     this.setUSer(data);
  //   } else {
  //     alert('failed');
  //   }
  // };

  showAnimation = () => {
    const { favorite } = this.state;

    if (favorite == false) {
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
    const { user, favorite, showAnimation } = this.state;

    return (
      <View style={styles.container}>
        {user && (
          <View
            style={{
              flex: 1,
              marginTop: 30,
              backgroundColor: 'black',
              padding: 10,
            }}
          >
            <Text style={{ color: 'white' }}>
              {JSON.stringify(favorite)}
            </Text>
            <Text style={{ color: 'white' }}>
              {user.name}
            </Text>
            <Text style={{ color: 'white' }}>
              {user.email}
            </Text>
          </View>
        )}

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

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'pink',
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 13,
              borderRadius: 40,
              backgroundColor: 'green',
            }}
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={styles.text}>
F
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 13,
              borderRadius: 40,
              backgroundColor: 'red',
            }}
            onPress={() => this.loginWithGoogle()}
          >
            <Text style={styles.text}>
G
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default OAuthScreen;
