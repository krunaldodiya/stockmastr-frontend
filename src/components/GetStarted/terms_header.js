import { Body, Header, Left, Text, Thumbnail } from "native-base";
import React from "react";
import styles from "./styles";

const contract = require("../../../assets/images/contract.png");

const TermsHeader = () => (
  <Header style={styles.termsWrapper} androidStatusBarColor="#d80402">
    <Left>
      <Thumbnail style={styles.termsIcon} source={contract} />
    </Left>

    <Body>
      <Text style={styles.termsHeader}>TERMS & CONDITIONS</Text>
    </Body>
  </Header>
);

export default TermsHeader;
