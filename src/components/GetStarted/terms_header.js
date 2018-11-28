import { Body, Header, Left, Text } from "native-base";
import React from "react";
import { Image } from "react-native";
import styles from "./styles";

const contract = require("../../../assets/images/contract.png");

const TermsHeader = props => (
  <Header style={styles.termsWrapper}>
    <Left>
      <Image style={styles.termsIcon} source={contract} />
    </Left>

    <Body>
      <Text style={styles.termsHeader}>TERMS & CONDITIONS</Text>
    </Body>
  </Header>
);

export default TermsHeader;
