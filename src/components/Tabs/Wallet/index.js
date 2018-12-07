import { Container } from "native-base";
import React from "react";
import TopBar from "../../shared/TopBar";
import styles from "./styles";

const Wallet = props => (
  <Container style={styles.container}>
    <TopBar {...props} />
  </Container>
);

export default Wallet;
