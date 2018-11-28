import { Button, Form, Input, Item, Text } from "native-base";
import React from "react";
import styles from "./styles";

const RequestOtpForm = props => {
  const { guest, navigation, requestOtp, handleOtpInput } = props;
  const { mobile, errors, loading } = guest;

  return (
    <Form style={styles.formWrapper}>
      <Item style={styles.inputWrapper}>
        <Input
          placeholder={errors ? errors.errors.mobile[0] : "9876543210"}
          placeholderTextColor={errors ? "#e74c3c" : "#000"}
          keyboardType="number-pad"
          maxLength={10}
          value={mobile}
          onChangeText={number => handleOtpInput({ mobile: number })}
          style={styles.input(errors)}
        />
      </Item>

      <Item style={styles.submitButtonWrapper}>
        <Button
          rounded
          small
          disabled={loading}
          style={styles.submitButton}
          onPress={() => requestOtp({ mobile, navigation, mode: "request" })}
        >
          <Text style={styles.submitButtonText}>SEND OTP</Text>
        </Button>
      </Item>
    </Form>
  );
};

export default RequestOtpForm;
