import { Text, View, Button } from "native-base";
import React from "react";
import styles from "./styles";

const TermsButton = props => {
  const { navigation, agree } = props;

  return (
    <View style={styles.submitButtonWrapper}>
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
    </View>
  );
};

export default TermsButton;
