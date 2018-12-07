import { Container, View, Text } from "native-base";
import React from "react";
import SideDrawer from "../../shared/SideDrawer";
import TopBar from "../../shared/TopBar";
import styles from "./styles";

const Wallet = props => (
  <SideDrawer {...props}>
    <Container style={styles.container}>
      <TopBar {...props} />

      <View style={{ padding: 20 }}>
        <Text>Wallet</Text>
      </View>
    </Container>
  </SideDrawer>
);

export default Wallet;
