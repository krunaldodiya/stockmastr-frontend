import React from 'react';
import {
  View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView,
} from 'react-native';
// 3rd
import { google, facebook } from 'react-native-simple-auth';
// style
import styles from '../../styles/OAuthScreen';
// services
import { setAuthToken } from '../../services/auth';
// theme
import theme from '../../libs/theme';

// images
const phoneHand = require('../../../assets/images/phone-hand.png');
const facebookLogin = require('../../../assets/images/facebook.png');
const googleLogin = require('../../../assets/images/google.png');

class OAuthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  loginWithGoogle = async () => {
    google({
      appId: '700045608007-77iit7ov1thbbcmr2olfmsf1a2ategh7.apps.googleusercontent.com',
      callback: 'com.socialstock:/oauth2redirect',
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
      callback: 'fb1941481456155598://authorize',
    })
      .then((info) => {
        this.checkAuth(info);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  checkAuth = async (info) => {
    console.log(info);

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
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView behavior="position" enabled style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Image style={{ width: 130, height: 130 }} source={phoneHand} />
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: theme.fonts.TitilliumWebSemiBold,
            }}
          >
            LOGIN
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#ffffff',
              marginHorizontal: 20,
              marginTop: 10,
              fontFamily: theme.fonts.TitilliumWebSemiBold,
            }}
          >
            Please, Enter your email to receive verification code
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 30,
          }}
        >
          <TextInput
            placeholder="john.doe@example.com"
            placeholderTextColor="#000"
            style={{
              borderColor: 'black',
              marginHorizontal: 30,
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 20,
              fontFamily: theme.fonts.TitilliumWebRegular,
            }}
          />

          <TouchableOpacity
            style={{
              padding: 7,
              borderRadius: 40,
              marginTop: 30,
              marginBottom: 10,
              width: '40%',
              alignSelf: 'center',
              backgroundColor: 'black',
            }}
            onPress={() => navigation.replace('VerifyOtpScreen')}
          >
            <Text style={styles.text}>
SEND OTP
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              position: 'absolute',
              marginTop: 13,
              borderTopWidth: 1,
              borderTopColor: '#3d3d3d',
              width: '100%',
            }}
          />

          <View style={{ width: 50, backgroundColor: '#68b2e3' }}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#3d3d3d',
                fontFamily: theme.fonts.TitilliumWebLight,
              }}
            >
              OR
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 40,
            }}
            onPress={() => this.loginWithFacebook()}
          >
            <Image style={{ width: 60, height: 60 }} source={facebookLogin} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 40,
            }}
            onPress={() => this.loginWithGoogle()}
          >
            <Image style={{ width: 60, height: 60 }} source={googleLogin} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default OAuthScreen;
