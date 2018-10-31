import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// 3rd
import { google, facebook } from 'react-native-simple-auth';
// style
import styles from '../../styles/OAuthScreen';
// services
import { setAuthToken } from '../../services/auth';

class OAuthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  loginWithGoogle = async () => {
    google({
      appId: '700045608007-opuiu8g06mosevje8mfnc897d29bj31q.apps.googleusercontent.com',
      callback: 'com.ssx.socialstock:/oauth2redirect',
    })
      .then((info) => {
        this.checkAuth(info);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  loginWithFacebook = async () => {
    facebook({
      appId: '1941481456155598',
      callback: 'com.ssx.socialstock://authorize',
    })
      .then((info) => {
        this.checkAuth(info);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  checkAuth = async (info) => {
    const { navigation, socialAuthMutation } = this.props;
    const variables = { email: info.user.email, name: info.user.name };

    socialAuthMutation({ variables })
      .then(async (response) => {
        await setAuthToken(response.data.socialAuth.token);

        return navigation.replace('UserTypeScreen', {
          type: response.data.socialAuth.user.type,
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { user } = this.state;

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
