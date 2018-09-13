import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Container, Item, Button, Text,
} from 'native-base';

// components
import { google, facebook } from 'react-native-simple-auth';
import { compose, graphql, withApollo } from 'react-apollo';
import Logo from '../../components/Logo';
import theme from '../../libs/theme';

import { SIGNUP_MUTATION, LOGIN_MUTATION, SOCIAL_AUTH_MUTATION } from '../../graphql';
import { setAuthToken, setAuthUserId } from '../../libs/auth';

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 20,
    shadowColor: '#3f2201',
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});

class OauthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async loginWithGoogle() {
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
  }

  async loginWithFacebook() {
    facebook({
      appId: '1941481456155598',
      callback: 'fb1941481456155598://authorize',
    })
      .then((info) => {
        this.checkAuth(info);
      })
      .catch((error) => {
        console.log('error', error);

        // error.code
        // error.description
      });
  }

  async checkAuth(info) {
    const { navigation, socialAuthMutation } = this.props;
    const variables = { email: info.user.email, name: info.user.name };

    socialAuthMutation({ variables })
      .then(async (response) => {
        await setAuthToken(response.data.socialAuth.token);
        await setAuthUserId(response.data.socialAuth.user.id);

        return navigation.replace('UserTypeScreen', {
          type: response.data.socialAuth.user.type,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Logo />

        <Container
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: theme.background.secondary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Item>
            <Button
              style={[styles.submitButton, { backgroundColor: '#DB4437' }]}
              onPress={() => this.loginWithGoogle()}
            >
              <Text style={{ width: '100%', textAlign: 'center' }}>
Login with Google
              </Text>
            </Button>
          </Item>

          <Item>
            <Button
              style={[styles.submitButton, { backgroundColor: '#3B5998' }]}
              onPress={() => this.loginWithFacebook()}
            >
              <Text style={{ width: '100%', textAlign: 'center' }}>
Login with Facebook
              </Text>
            </Button>
          </Item>
        </Container>
      </View>
    );
  }
}

export default compose(
  withApollo,
  graphql(SOCIAL_AUTH_MUTATION, { name: 'socialAuthMutation' }),
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(OauthScreen);
