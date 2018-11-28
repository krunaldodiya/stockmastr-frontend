import { Button, Form, Input, Item, Text } from "native-base";
import React from "react";
import styles from "./styles";

const RequestOtpForm = () => (
  <Form style={styles.formWrapper}>
    <Item style={styles.inputWrapper}>
      <Input
        placeholder={errors ? errors.errors.mobile[0] : "9876543210"}
        placeholderTextColor={errors ? "#e74c3c" : "#000"}
        keyboardType="number-pad"
        maxLength={10}
        value={mobile}
        onChangeText={number => {
          this.props.handleOtpInput({ mobile: number });
        }}
        style={styles.input(errors)}
      />
    </Item>

    <Item style={styles.submitButtonWrapper}>
      <Button
        style={styles.submitButton}
        onPress={() =>
          this.props.requestOtp({ mobile, navigation, mode: "request" })
        }
      >
        <Text style={styles.submitButtonText}>SEND OTP</Text>
      </Button>
    </Item>
  </Form>
);

export default RequestOtpForm;
