import { Body, Header, Left, Text, Icon } from "native-base";
import React from "react";
import styles from "./styles";

const NewsHeader = () => (
  <Header style={styles.termsWrapper} androidStatusBarColor="#d80402">
    <Left>
      <Icon type="FontAwesome" name="back" />
    </Left>

    <Body>
      <Text style={styles.termsHeader}>NEWS DETAIL</Text>
    </Body>
  </Header>
);

export default NewsHeader;
