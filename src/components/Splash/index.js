import React from "react";
import styles from "./styles";
import { View, Image } from "react-native";

const Splash = () => (
  <View style={styles.container}>
    <Image
      source={require("../../../assets/images/background.png")}
      style={{ width: 100, height: 100 }}
    />
  </View>
);

export default Splash;
