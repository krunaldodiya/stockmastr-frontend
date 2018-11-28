import { Icon, Text, View } from "native-base";
import React from "react";
import styles from "./styles";

const NoNetwork = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Icon
        type="FontAwesome"
        name="signal"
        color="black"
        size={24}
        style={styles.icon}
      />

      <Text style={styles.signal}>Oops, No Network !</Text>
    </View>

    <View style={styles.body}>
      <Text style={styles.text}>Please, Check your internet connection.</Text>
    </View>
  </View>
);

export default NoNetwork;
