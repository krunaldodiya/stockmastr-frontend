import { Spinner, View } from "native-base";
import React from "react";
import styles from "./styles";

const Splash = () => (
  <View style={styles.container}>
    <Spinner color="#fff" size="small" />
  </View>
);

export default Splash;
