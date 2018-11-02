import React from 'react';
import {
  View, Text, TouchableOpacity, Image, KeyboardAvoidingView,
} from 'react-native';
// 3rd
// style
import CodeInput from 'react-native-confirmation-code-input';
import styles from '../../styles/OAuthScreen';
// services
// theme
import theme from '../../libs/theme';

// images
const phoneHand = require('../../../assets/images/phone-hand.png');

class VerifyOtpScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      otp: null,
      verifyOtp: '1234',
      time: 9,
    };
  }

  onFinishCheckingCode = async (isValid, code) => {
    console.log(isValid, code);
  };

  componentDidMount() {
    const interval = setInterval(() => {
      const { time } = this.state;

      if (time === 0) clearInterval(interval);
      if (time > 0) {
        this.setState({ time: time - 1 });
      }
    }, 1000);
  }

  render() {
    const { otp, verifyOtp, time } = this.state;

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
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{ fontSize: 16, color: 'white', fontFamily: theme.fonts.TitilliumWebRegular }}
            >
              Please, Enter verification code send to &nbsp;
            </Text>
            <Text
              style={{ fontSize: 16, color: 'black', fontFamily: theme.fonts.TitilliumWebSemiBold }}
            >
              john.doe@example.com
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#ffffff',
                fontFamily: theme.fonts.TitilliumWebSemiBold,
              }}
            >
              Not your email ?
            </Text>
          </View>
        </View>

        <View style={{ height: 70, marginVertical: 20 }}>
          <CodeInput
            ref={otp}
            keyboardType="numeric"
            className="border-b"
            compareWithCode={verifyOtp}
            codeLength={4}
            space={5}
            size={50}
            autoFocus={false}
            inputPosition="center"
            codeInputStyle={{ fontSize: 30 }}
            onFulfill={(isValid, code) => this.onFinishCheckingCode(isValid, code)}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 10,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{ fontSize: 16, color: 'white', fontFamily: theme.fonts.TitilliumWebRegular }}
            >
              RESEND OTP &nbsp;
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: theme.fonts.TitilliumWebSemiBold,
                }}
              >
                in
              </Text>
            </Text>

            <View
              style={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 40,
                marginTop: 20,
                width: 60,
                height: 60,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 22,
                  textAlign: 'center',
                  marginTop: 12,
                }}
              >
                {time}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 40,
              marginTop: 30,
              width: '50%',
              alignSelf: 'center',
              backgroundColor: 'black',
            }}
            onPress={() => this.loginWithGoogle()}
          >
            <Text style={styles.text}>
VERIFY OTP
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default VerifyOtpScreen;
