import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { compose, withApollo } from "react-apollo";
// 3rd
import Spinner from "react-native-loading-spinner-overlay";
// style
import styles from "../../styles/OtpAuthScreen";
// services
import { sendOtp } from "../../services";
// theme
import theme from "../../libs/theme";

// images
const phoneHand = require("../../../assets/images/phone-hand.png");

class OtpAuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      mobile: null,
      error: false,
      spinner: false
    };
  }

  sendOtp = async () => {
    const { mobile } = this.state;
    const { navigation } = this.props;

    this.setState({ spinner: true });

    try {
      const { data } = await sendOtp(mobile);
      this.setState({ spinner: false });
      return data ? navigation.replace("VerifyOtpScreen", data) : false;
    } catch (error) {
      this.setState({ spinner: false, error: true });
    }
  };

  render() {
    const { error, spinner } = this.state;

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
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 30
          }}
        >
          <Text
            style={{
              fontSize: 26,
              textAlign: "center",
              color: "#ffffff",
              fontFamily: theme.fonts.TitilliumWebSemiBold
            }}
          >
            LOGIN
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#ffffff",
              marginHorizontal: 20,
              marginTop: 30,
              fontFamily: theme.fonts.TitilliumWebSemiBold
            }}
          >
            Please, Enter your mobile to receive verification code
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginTop: 50
          }}
        >
          <TextInput
            placeholder="9876543210"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={mobile => this.setState({ mobile, error: false })}
            style={{
              borderColor: error ? "red" : "black",
              marginHorizontal: 30,
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 20,
              fontFamily: theme.fonts.TitilliumWebRegular
            }}
          />

          <View style={styles.submitButtonWrapper}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.sendOtp()}
            >
              <Text style={styles.submitButtonText}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(withApollo)(OtpAuthScreen);