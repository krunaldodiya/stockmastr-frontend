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

import { SIGNUP_MUTATION, LOGIN_MUTATION, CHECK_USER_EXISTS_QUERY } from '../../graphql';
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

  constructor(props) {
    super(props);

    this.state = {
      authUser: {
        type: 'trader',
        gender: 'male',
        city: '',
        state: '',
      },
    };
  }

  async loginWithGoogle() {
    google({
      appId: '994327051971-86prhenegaqbk3e3ehmsecpqmsufsejq.apps.googleusercontent.com',
      callback: 'com.ssx.socialstock:/oauth2redirect',
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
    const { client } = this.props;

    client
      .query({
        query: CHECK_USER_EXISTS_QUERY,
        variables: { email: info.user.email },
      })
      .then(({ data }) => (data.user ? this.login(info.user) : this.signup(info.user)))
      .catch(error => console.log(error));
  }

  async login(user) {
    const { loginMutation, navigation } = this.props;
    const variables = { email: user.email };

    return loginMutation({ variables })
      .then(async (response) => {
        await setAuthToken(response.data.login.token);
        await setAuthUserId(response.data.login.user.id);

        return navigation.replace('UserTypeScreen', {
          type: response.data.login.user.type,
        });
      })
      .catch(error => console.log(error));
  }

  async signup(user) {
    const { authUser } = this.state;
    const { signupMutation, navigation } = this.props;
    const variables = {
      ...authUser,
      email: user.email,
      name: user.name,
    };

    return signupMutation({ variables })
      .then(async (response) => {
        await setAuthToken(response.data.signup.token);
        await setAuthUserId(response.data.signup.user.id);

        return navigation.replace('UserTypeScreen', {
          type: response.data.signup.user.type,
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
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(OauthScreen);
