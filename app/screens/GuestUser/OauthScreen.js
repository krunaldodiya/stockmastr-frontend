import React from "react";
import { StyleSheet } from "react-native";
import { View, Container, Item, Button, Text } from "native-base";

// components
import Logo from "../../components/Logo";
import theme from "../../libs/theme";

import { google, facebook } from "react-native-simple-auth";
import { compose, graphql, withApollo } from "react-apollo";
import {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  CHECK_USER_EXISTS_QUERY
} from "../../graphql";
import { setAuthToken, setAuthUserId } from "../../libs/auth";

class OauthScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      provider: null,
      authUser: {
        type: "trader",
        gender: "male",
        city: "",
        state: ""
      },
      loading: false
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Logo />

        <Container
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: theme.background.secondary,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Item>
            <Button
              style={[styles.submitButton, { backgroundColor: "#DB4437" }]}
              onPress={() => this.auth("google")}
            >
              <Text style={{ width: "100%", textAlign: "center" }}>
                Login with Google
              </Text>
            </Button>
          </Item>

          <Item>
            <Button
              style={[styles.submitButton, { backgroundColor: "#3B5998" }]}
              onPress={() => this.auth("facebook")}
            >
              <Text style={{ width: "100%", textAlign: "center" }}>
                Login with Facebook
              </Text>
            </Button>
          </Item>
        </Container>
      </View>
    );
  }

  async auth(provider) {
    this.setState({ provider });

    switch (provider) {
      case "google":
        this.loginWithGoogle();
        break;

      case "facebook":
        this.loginWithFacebook();
        break;

      case "twitter":
        this.loginWithTwitter();
        break;

      default:
        break;
    }
  }

  async loginWithGoogle() {
    google({
      appId:
        "994327051971-86prhenegaqbk3e3ehmsecpqmsufsejq.apps.googleusercontent.com",
      callback: "com.ssx.socialstock:/oauth2redirect"
    })
      .then(info => {
        this.checkAuth(info);
      })
      .catch(error => {
        console.log("error", error);

        // error.code
        // error.description
      });
  }

  async loginWithFacebook() {
    facebook({
      appId: "1941481456155598",
      callback: "fb1941481456155598://authorize"
    })
      .then(info => {
        this.checkAuth(info);
      })
      .catch(error => {
        console.log("error", error);

        // error.code
        // error.description
      });
  }

  async checkAuth(info) {    
    this.props.client
      .query({
        query: CHECK_USER_EXISTS_QUERY,
        variables: { email: info.user.email }
      })
      .then(({ data }) => {
        return data.user ? this.login(info.user) : this.signup(info.user);
      })
      .catch(error => console.log(error));
  }

  async login(user) {
    return this.props
      .loginMutation({
        variables: { email: user.email }
      })
      .then(async response => {
        const authToken = await setAuthToken(response.data.login.token);
        const authUserId = await setAuthUserId(response.data.login.user.id);

        return this.props.navigation.replace("UserTypeScreen", {
          type: response.data.login.user.type
        });
      })
      .catch(error => console.log(error));
  }

  async signup(user) {
    return this.props
      .signupMutation({
        variables: {
          ...this.state.authUser,
          email: user.email,
          name: user.name
        }
      })
      .then(async response => {
        const authToken = await setAuthToken(response.data.signup.token);
        const authUserId = await setAuthUserId(response.data.signup.user.id);

        return this.props.navigation.replace("UserTypeScreen", {
          type: response.data.signup.user.type
        });
      })
      .catch(error => console.log(error));
  }
}

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 20,
    shadowColor: "#3f2201",
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  }
});

export default compose(
  withApollo,
  graphql(SIGNUP_MUTATION, { name: "signupMutation" }),
  graphql(LOGIN_MUTATION, { name: "loginMutation" })
)(OauthScreen);
