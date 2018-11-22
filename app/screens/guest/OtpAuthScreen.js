import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
// 3rd
import Spinner from "react-native-loading-spinner-overlay";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// style
import styles from "../../styles/OtpAuthScreen";
// theme
import theme from "../../libs/theme";
import { handleOtpInput, requestOtp } from "../../store/actions";

// images
const phoneHand = require("../../../assets/images/phone-hand.png");

class OtpAuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { guest, handleOtpInput, requestOtp, navigation } = this.props;
    const { mobile, loading, errors } = guest;

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
            marginTop: 50
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
            placeholder={errors ? errors.errors.mobile[0] : "9876543210"}
            placeholderTextColor={errors ? "#e74c3c" : "black"}
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={number => handleOtpInput({ mobile: number })}
            style={{
              borderColor: errors ? "#e74c3c" : "black",
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
              onPress={() => requestOtp({ mobile, navigation })}
            >
              <Text style={styles.submitButtonText}>SEND OTP</Text>
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
    { handleOtpInput: handleOtpInput, requestOtp: requestOtp },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpAuthScreen);
