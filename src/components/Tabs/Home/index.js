import { Text, View } from "native-base";
import React from "react";
import styles from "./styles";
import TopBar from "../../shared/TopBar";

const Home = props => {
  return (
    <View style={styles.container}>
      <TopBar {...props} />
    </View>
  );
};

export default Home;
