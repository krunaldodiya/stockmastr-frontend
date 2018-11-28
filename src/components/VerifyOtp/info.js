import { View, Text } from "native-base";
import React from "react";
import styles from "./styles";

const TopImage = ({ mobile }) => (
  <View style={styles.infoWrapper}>
    <Text style={styles.infoHeading}>
      Please, Enter verification code send to &nbsp;
    </Text>
    <Text style={styles.infoParagraph}>{mobile}</Text>
  </View>
);

export default TopImage;
