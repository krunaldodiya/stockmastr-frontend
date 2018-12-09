import { Body, Header, Left, Text, Icon } from "native-base";
import React from "react";
import styles from "./styles";

const ContentHeader = props => (
  <Header style={styles.termsWrapper} androidStatusBarColor="#d80402">
    <Left>
      <Icon
        type="MaterialIcons"
        name="arrow-back"
        style={styles.termsIcon}
        onPress={() => props.navigation.goBack()}
      />
    </Left>

    <Body>
      <Text style={styles.termsHeader}>ADD MONEY</Text>
    </Body>
  </Header>
);

export default ContentHeader;
