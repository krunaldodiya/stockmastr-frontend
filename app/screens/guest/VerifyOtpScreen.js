import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert
} from "react-native";
// 3rd
// style
import CodeInput from "react-native-confirmation-code-input";
import { compose, withApollo } from "react-apollo";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "../../styles/VerifyOtpScreen";
// services
import {
  getInitialScreen,
  checkUserExists,
  createUser,
  login,
  sendOtp
} from "../../services";
// theme
import theme from "../../libs/theme";

// images
const phoneHand = require("../../../assets/images/phone-hand.png");

class VerifyOtpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    const { otp, mobile, user } = props.navigation.state.params;

    this.state = {
      spinner: false,
      verifyOtp: null,
      otp: otp.toString(),
      mobile,
      user,
      time: 20,
      otpVerified: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { time } = this.state;

      if (time === 0) clearInterval(this.interval);
      if (time > 0) {
        this.setState({ time: time - 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onFinishCheckingCode = async isValid => {
    this.setState({ otpVerified: isValid });
  };

  otpAuth = async () => {
    const { otpVerified, mobile, user } = this.state;
    const { navigation, client } = this.props;

    if (otpVerified) {
      this.setState({ spinner: true });

      let authUser = user;
      if (!authUser) {
        authUser = await createUser(client, { mobile });
      }

      const token = await login(client, { mobile });
      const screen = await getInitialScreen();

      this.setState({ spinner: false });

      return token ? navigation.replace(screen, { user: authUser }) : false;
    }

    return Alert.alert("Oops", "Invalid otp");
  };

  resendOtp = async () => {
    const { mobile } = this.state;

    this.setState({ spinner: true });

    try {
      const { data } = await sendOtp(mobile);

      this.setState({ spinner: false, otp: data.otp.toString() });
      return Alert.alert("Success", "Please, check your mobile");
    } catch (error) {
      this.setState({ spinner: false });
    }
  };

  render() {
    const { mobile, otp, verifyOtp, time, otpVerified, spinner } = this.state;

    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={styles.container}
      >
        <Spinner
          visible={spinner}
          textContent="Loading..."
          textStyle={styles.spinner}
          overlayColor="rgba(0,0,0,0.8)"
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Image style={{ width: 130, height: 130 }} source={phoneHand} />
        </View>

        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginHorizontal: 15
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontFamily: theme.fonts.TitilliumWebRegular
              }}
            >
              Please, Enter verification code send to &nbsp;
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "black",
                fontFamily: theme.fonts.TitilliumWebSemiBold,
                marginTop: 5
              }}
            >
              {mobile}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              marginTop: 20
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.replace("OtpAuthScreen")}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "#ffffff",
                  fontFamily: theme.fonts.TitilliumWebSemiBold
                }}
              >
                Not your mobile ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 70, marginVertical: 20 }}>
          <CodeInput
            ref={verifyOtp}
            keyboardType="numeric"
            className="border-b"
            compareWithCode={otp}
            codeLength={4}
            space={5}
            size={50}
            autoFocus
            inputPosition="center"
            codeInputStyle={{ fontSize: 30 }}
            onFulfill={isValid => this.onFinishCheckingCode(isValid)}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            marginTop: 10
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              disabled={time > 0}
              onPress={() => this.resendOtp()}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: time > 0 ? "gray" : "indigo",
                  fontFamily: theme.fonts.TitilliumWebRegular
                }}
              >
                RESEND OTP &nbsp;
                <Text
                  style={{
                    fontSize: 16,
                    color: time > 0 ? "gray" : "black",
                    fontFamily: theme.fonts.TitilliumWebRegular
                  }}
                >
                  IN
                </Text>
              </Text>
            </TouchableOpacity>

            <View
              style={{
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 40,
                marginTop: 20,
                width: 60,
                height: 60
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 22,
                  textAlign: "center",
                  marginTop: 12
                }}
              >
                {time}
              </Text>
            </View>
          </View>

          <View style={styles.submitButtonWrapper}>
            <TouchableOpacity
              style={
                otpVerified ? styles.submitButton : styles.submitButtonDisabled
              }
              onPress={() => this.otpAuth()}
            >
              <Text
                style={
                  otpVerified
                    ? styles.submitButtonText
                    : styles.submitButtonTextDisabled
                }
              >
                VERIFY OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(withApollo)(VerifyOtpScreen);
