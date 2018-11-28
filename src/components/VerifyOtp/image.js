import { Thumbnail, View } from "native-base";
import React from "react";
import styles from "./styles";

const phoneHand = require("../../../assets/images/phone-hand.png");

const TopImage = () => (
  <View style={styles.topImageWrapper}>
    <Thumbnail style={styles.topImage} source={phoneHand} />
  </View>
);

export default TopImage;
