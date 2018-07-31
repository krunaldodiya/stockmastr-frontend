import React from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import {
  View,
  Text,
  Input,
  Button,
  Container,
  Form,
  Item,
  Left,
  Right
} from "native-base";

// components
import Logo from "../../components/Logo";

import { compose, graphql } from "react-apollo";
import {
  CHECK_USER_EXISTS_QUERY,
  SIGNUP_MUTATION,
  LOGIN_MUTATION
} from "../../graphql";
import { setAuthToken, setAuthUserId } from "../../libs/auth";
import theme from "../../libs/theme";

class VerifyOtpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: null,
      verifyOtp: props.navigation.state.params.otp,
      time: 9,
      exists: false,
      authUser: {
        mobile: props.navigation.state.params.mobile,
        type: "trader",
        name: "",
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

  async componentWillMount() {
    this.timer = setInterval(() => {
      if (this.state.time < 1) {
        return clearInterval(this.timer);
      }

      this.setState({
        time: this.state.time - 1
      });
    }, 1000);
  }

  async componentWillReceiveProps(props) {
    if (props.checkUserExists.user) {
      this.setState({
        authUser: props.checkUserExists.user,
        exists: true
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Logo />
        </View>

        <Container
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: theme.background.secondary,
            alignItems: "center"
          }}
        >
          <Form>
            <View>
              <Item
                style={{
                  borderBottomWidth: 0,
                  paddingTop: 20,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Left>
                  <Text style={{ textAlign: "left" }}>
                    00:0{this.state.time}
                  </Text>
                </Left>
                <Right>
                  {this.state.time == 0 && (
                    <Text
                      style={{ textAlign: "right", color: "black" }}
                      onPress={() => this.resetOtp()}
                    >
                      Resend OTP
                    </Text>
                  )}
                  {this.state.time > 0 && (
                    <Text style={{ textAlign: "right" }}>Sending OTP</Text>
                  )}
                </Right>
              </Item>

              <Item
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    borderColor: theme.background.primary
                  }}
                  onSubmitEditing={() => this.verifyOtp()}
                  onChangeText={otp => this.updateOtp(otp)}
                  underlineColorAndroid="transparent"
                  value={this.state.otp}
                  placeholder="XXXX"
                  autoFocus={true}
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "phone-pad"
                  }
                  maxLength={4}
                  returnKeyType="next"
                />
              </Item>
            </View>

            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Item
                style={{
                  marginBottom: 20,
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Button
                  style={styles.submitButton}
                  disabled={this.state.loading}
                  onPress={() => this.verifyOtp()}
                >
                  <Text style={{ width: "100%", textAlign: "center" }}>
                    {this.state.loading ? "Please, Wait..." : "VERIFY OTP"}
                  </Text>
                </Button>
              </Item>
            </View>
          </Form>
        </Container>
      </View>
    );
  }

  resetOtp() {
    this.props.navigation.replace("RequestOtpScreen");
  }

  updateOtp(otp) {
    this.setState({ otp });
  }

  async verifyOtp() {
    this.setState({ loading: true });

    if (this.state.verifyOtp != this.state.otp) {
      return Alert.alert(
        "Error",
        "Wrong OTP",
        [{ text: "OK", onPress: () => this.setState({ loading: false }) }],
        { cancelable: false }
      );
    }

    return this.state.exists ? this.login() : this.signup();
  }

  async login() {
    return this.props
      .loginMutation({
        variables: { mobile: this.state.authUser.mobile }
      })
      .then(async response => {
        const authToken = await setAuthToken(response.data.login.token);
        const authUserId = await setAuthUserId(response.data.login.user.id);

        return this.props.navigation.replace("UserTypeScreen", {
          type: this.state.authUser.type
        });
      })
      .catch(error => console.log(error));
  }

  async signup() {
    return this.props
      .signupMutation({ variables: this.state.authUser })
      .then(async response => {
        const authToken = await setAuthToken(response.data.signup.token);
        const authUserId = await setAuthUserId(response.data.signup.user.id);

        return this.props.navigation.replace("UserTypeScreen", {
          type: this.state.authUser.type
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
    padding: 10,
    backgroundColor: theme.background.primary
  }
});

export default compose(
  graphql(SIGNUP_MUTATION, { name: "signupMutation" }),
  graphql(LOGIN_MUTATION, { name: "loginMutation" }),
  graphql(CHECK_USER_EXISTS_QUERY, {
    name: "checkUserExists",
    options: props => {
      return {
        variables: {
          mobile: props.navigation.state.params.mobile
        }
      };
    }
  })
)(VerifyOtpScreen);
