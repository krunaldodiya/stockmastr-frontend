import { View } from "native-base";
import React from "react";
import { Image } from "react-native";
import styles from "./styles";

const phoneHand = require("../../../assets/images/logo.png");

const TopImage = () => (
  <View style={styles.topImageWrapper}>
    <Image style={styles.topImage} source={phoneHand} resizeMode="contain" />
  </View>
);

export default TopImage;
