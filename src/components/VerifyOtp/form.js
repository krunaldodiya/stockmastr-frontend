import { Button, Form, Item, Text } from "native-base";
import React from "react";
import CodeInput from "react-native-confirmation-code-input";
import styles from "./styles";

const onFinishCheckingCode = isValid => {
  console.log(isValid);
};

const VerifyOtpForm = props => {
  const { guest, navigation, verifyOtp } = props;
  const { mobile, loading, otp, clientOtp } = guest;

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
          onFulfill={isValid => onFinishCheckingCode(isValid)}
        />
      </Item>

      <Item style={styles.submitButtonWrapper}>
        <Button
          rounded
          small
          disabled={loading}
          style={styles.submitButton}
          onPress={() => verifyOtp({ mobile, otp, navigation })}
        >
          <Text style={styles.submitButtonText}>VERIFY OTP</Text>
        </Button>
      </Item>
    </Form>
  );
};

export default VerifyOtpForm;
