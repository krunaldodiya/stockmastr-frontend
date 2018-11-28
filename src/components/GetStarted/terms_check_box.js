import React from "react";
import styles from "./styles";
import { CheckBox, View, Text } from "native-base";

const TermsCheckBox = props => {
  const { agree, acceptTerms } = props;

  return (
    <View style={styles.agreeWrapper}>
      <CheckBox
        checked={agree ? true : false}
        onPress={() => acceptTerms()}
        style={{
          marginTop: 1,
          alignItems: "center",
          borderColor: agree ? "black" : "white",
          backgroundColor: agree ? "black" : "white"
        }}
      />

      <Text style={styles.agreeText}>
        I have read all the terms & conditions.
      </Text>
    </View>
  );
};

export default TermsCheckBox;
