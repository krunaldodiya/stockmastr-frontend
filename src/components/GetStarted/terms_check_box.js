import { CheckBox, Text, View } from "native-base";
import React from "react";
import styles from "./styles";

const TermsCheckBox = props => {
  const { guest, toggleTermsAgreement } = props;
  const { agree } = guest;

  return (
    <View style={styles.agreeWrapper}>
      <CheckBox
        checked={agree ? true : false}
        onPress={() => toggleTermsAgreement()}
        style={styles.checkBox(agree)}
      />

      <Text style={styles.agreeText}>
        I have read all the terms & conditions.
      </Text>
    </View>
  );
};

export default TermsCheckBox;
