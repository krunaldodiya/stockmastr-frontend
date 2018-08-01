import React from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  View, Text, Input, Button, Container, Form, Item, Left, Right,
} from 'native-base';

// components
import { compose, graphql } from 'react-apollo';
import Logo from '../../components/Logo';

import { CHECK_USER_EXISTS_QUERY, SIGNUP_MUTATION, LOGIN_MUTATION } from '../../graphql';
import { setAuthToken, setAuthUserId } from '../../libs/auth';
import theme from '../../libs/theme';

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
    backgroundColor: theme.background.primary,
  },
});

class VerifyOtpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      otp: null,
      verifyOtp: props.navigation.state.params.otp,
      time: 9,
      exists: false,
      authUser: {
        mobile: props.navigation.state.params.mobile,
        type: 'trader',
        name: '',
        gender: 'male',
        city: '',
        state: '',
      },
      loading: false,
    };
  }

  async componentWillMount() {
    const { time } = this.state;

    this.timer = setInterval(() => {
      if (time < 1) {
        return clearInterval(this.timer);
      }

      return this.setState({
        time: time - 1,
      });
    }, 1000);
  }

  async componentWillReceiveProps(props) {
    const { checkUserExists } = props;

    if (checkUserExists.user) {
      this.setState({
        authUser: checkUserExists.user,
        exists: true,
      });
    }
  }

  async componentWillUnmount() {
    clearInterval(this.timer);
  }

  async resetOtp() {
    const { navigation } = this.props;
    navigation.replace('RequestOtpScreen');
  }

  async updateOtp(otp) {
    this.setState({ otp });
  }

  async verifyOtp() {
    this.setState({ loading: true });

    const { verifyOtp, otp, exists } = this.state;

    if (verifyOtp !== otp) {
      return Alert.alert(
        'Error',
        'Wrong OTP',
        [{ text: 'OK', onPress: () => this.setState({ loading: false }) }],
        { cancelable: false },
      );
    }

    return exists ? this.login() : this.signup();
  }

  async login() {
    const { loginMutation, navigation } = this.props;
    const { authUser } = this.state;

    return loginMutation({
      variables: { mobile: authUser.mobile },
    })
      .then(async (response) => {
        await setAuthToken(response.data.login.token);
        await setAuthUserId(response.data.login.user.id);

        return navigation.replace('UserTypeScreen', {
          type: authUser.type,
        });
      })
      .catch(error => console.log(error));
  }

  async signup() {
    const { signupMutation, navigation } = this.props;
    const { authUser } = this.state;

    return signupMutation({ variables: authUser })
      .then(async (response) => {
        await setAuthToken(response.data.signup.token);
        await setAuthUserId(response.data.signup.user.id);

        return navigation.replace('UserTypeScreen', {
          type: authUser.type,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { time, otp, loading } = this.state;

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
            alignItems: 'center',
          }}
        >
          <Form>
            <View>
              <Item
                style={{
                  borderBottomWidth: 0,
                  paddingTop: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <Left>
                  <Text style={{ textAlign: 'left' }}>
                    00:0
                    {time}
                  </Text>
                </Left>
                <Right>
                  {time === 0 && (
                    <Text
                      style={{ textAlign: 'right', color: 'black' }}
                      onPress={() => this.resetOtp()}
                    >
                      Resend OTP
                    </Text>
                  )}
                  {time > 0 && (
                  <Text style={{ textAlign: 'right' }}>
Sending OTP
                  </Text>
                  )}
                </Right>
              </Item>

              <Item
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    borderColor: theme.background.primary,
                  }}
                  onSubmitEditing={() => this.verifyOtp()}
                  onChangeText={number => this.updateOtp(number)}
                  underlineColorAndroid="transparent"
                  value={otp}
                  placeholder="XXXX"
                  autoFocus
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
                  maxLength={4}
                  returnKeyType="next"
                />
              </Item>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Item
                style={{
                  marginBottom: 20,
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                <Button
                  style={styles.submitButton}
                  disabled={loading}
                  onPress={() => this.verifyOtp()}
                >
                  <Text style={{ width: '100%', textAlign: 'center' }}>
                    {loading ? 'Please, Wait...' : 'VERIFY OTP'}
                  </Text>
                </Button>
              </Item>
            </View>
          </Form>
        </Container>
      </View>
    );
  }
}

VerifyOtpScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
  graphql(CHECK_USER_EXISTS_QUERY, {
    name: 'checkUserExists',
    options: ({ navigation }) => ({
      variables: {
        mobile: navigation.state.params.mobile,
      },
    }),
  }),
)(VerifyOtpScreen);
