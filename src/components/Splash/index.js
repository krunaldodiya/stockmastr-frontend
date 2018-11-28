import React from "react";
import styles from "./styles";
import { Spinner, View } from "native-base";

const Splash = () => (
  <View style={styles.container}>
    <Spinner color="#000" size="small" />
  </View>
);

export default Splash;
