import { Button, Form, Item, Text, CheckBox } from "native-base";
import React from "react";
import styles from "./styles";

const TermsForm = props => {
  const { navigation, guest, toggleTermsAgreement } = props;
  const { agree } = guest;

  return (
    <Form style={styles.formWrapper}>
      <Item style={styles.agreeWrapper}>
        <CheckBox
          checked={agree ? true : false}
          onPress={() => toggleTermsAgreement()}
          style={styles.checkBox(agree)}
        />

        <Text style={styles.agreeText}>
          I have read all the terms & conditions.
        </Text>
      </Item>

      <Item style={styles.submitButtonWrapper}>
        <Button
          rounded
          small
          disabled={!agree}
          style={agree ? styles.submitButton : styles.submitButtonDisabled}
          onPress={() => navigation.replace("RequestOtpScreen")}
        >
          <Text
            style={
              agree ? styles.submitButtonText : styles.submitButtonTextDisabled
            }
          >
            Agree & Continue
          </Text>
        </Button>
      </Item>
    </Form>
  );
};

export default TermsForm;
