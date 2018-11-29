import { Button, Form, Item, Text } from "native-base";
import React from "react";
import { Alert } from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import styles from "./styles";

const checkOtp = (isValid, otpVerified) => {
  return otpVerified({ isValid });
};

const checkVerification = props => {
  const { guest, verifyOtp } = props;
  const { mobile, otp, otpVerified } = guest;

  if (otpVerified) {
    return verifyOtp({ mobile, otp });
  }

  return Alert.alert("Oops!", "Invalid OTP");
};

const VerifyOtpForm = props => {
  const { guest, otpVerified } = props;
  const { loading, otp, clientOtp } = guest;

  return (
    <Form style={styles.formWrapper}>
      <Item style={styles.inputWrapper}>
        <CodeInput
          ref={clientOtp}
          keyboardType="numeric"
          className="border-b"
          compareWithCode={otp.toString()}
          codeLength={4}
          space={5}
          size={50}
          autoFocus
          inputPosition="center"
          codeInputStyle={{ fontSize: 30 }}
          onChange={() => checkOtp(false, otpVerified)}
          onFulfill={isValid => checkOtp(isValid, otpVerified)}
        />
      </Item>

      <Item style={styles.submitButtonWrapper}>
        <Button
          rounded
          small
          disabled={loading}
          style={styles.submitButton}
          onPress={() => checkVerification(props)}
        >
          <Text style={styles.submitButtonText}>VERIFY OTP</Text>
        </Button>
      </Item>
    </Form>
  );
};

export default VerifyOtpForm;
