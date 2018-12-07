import { Container, Text, View } from "native-base";
import React from "react";
import SideDrawer from "../../shared/SideDrawer";
import TopBar from "../../shared/TopBar";
import styles from "./styles";

const Notifications = props => (
  <SideDrawer {...props}>
    <Container style={styles.container}>
      <TopBar {...props} />

      <View style={{ padding: 20 }}>
        <Text>Notifications</Text>
      </View>
    </Container>
  </SideDrawer>
);

export default Notifications;
