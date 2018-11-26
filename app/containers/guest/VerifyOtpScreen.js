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
import Spinner from "react-native-loading-spinner-overlay";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styles from "../../styles/VerifyOtpScreen";

// services
import { graph, setAuthToken } from "../../services";
// theme
import theme from "../../libs/theme";
import { api } from "../../libs/api";
import { handleOtpInput, requestOtp, verifyOtp } from "../../store/actions";

// images
const phoneHand = require("../../../assets/images/phone-hand.png");

class VerifyOtpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      verifyOtp: null,
      time: 10,
      otpVerified: false
    };
  }

  async componentDidMount() {
    this.startTimer();
  }

  startTimer = async () => {
    this.interval = setInterval(() => {
      const { time } = this.state;

      if (time === 0) clearInterval(this.interval);
      if (time > 0) {
        this.setState({ time: time - 1 });
      }
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onFinishCheckingCode = async isValid => {
    this.setState({ otpVerified: isValid });
  };

  render() {
    const { time, verifyOtp, otpVerified } = this.state;
    const { guest, navigation } = this.props;
    const { loading, mobile, otp } = guest;

    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={styles.container}
      >
        <Spinner
          visible={loading}
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
              onPress={() => navigation.replace("RequestOtpScreen")}
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
            compareWithCode={otp.toString()}
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
              onPress={() => {
                this.props.requestOtp({ mobile, navigation, mode: "resend" });
              }}
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
              onPress={() => this.props.verifyOtp({ mobile, otp, navigation })}
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

const mapStateToProps = state => ({
  guest: state.guest
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleOtpInput: handleOtpInput,
      requestOtp: requestOtp,
      verifyOtp: verifyOtp
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyOtpScreen);
