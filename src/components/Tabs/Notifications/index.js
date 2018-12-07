import { Container, View, Text } from "native-base";
import React from "react";
import TopBar from "../../shared/TopBar";
import styles from "./styles";

const Notifications = props => (
  <Container style={styles.container}>
    <TopBar {...props} />

    <View style={{ padding: 20 }}>
      <Text>Notifications</Text>
    </View>
  </Container>
);

export default Notifications;
