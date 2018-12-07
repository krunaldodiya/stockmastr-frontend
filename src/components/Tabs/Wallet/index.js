import { Container } from "native-base";
import React from "react";
import SideDrawer from "../../shared/SideDrawer";
import TopBar from "../../shared/TopBar";
import styles from "./styles";

const Wallet = props => (
  <SideDrawer {...props}>
    <Container style={styles.container}>
      <TopBar {...props} />
    </Container>
  </SideDrawer>
);

export default Wallet;
