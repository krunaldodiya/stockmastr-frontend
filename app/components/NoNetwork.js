import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/NoNetwork";

const NoNetwork = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Icon name="signal" color="black" size={24} style={styles.icon} />

      <Text style={styles.signal}>Oops, No Network !</Text>
    </View>

    <View style={styles.body}>
      <Text style={styles.text}>Please, Check your internet connection.</Text>
    </View>
  </View>
);

export default NoNetwork;
