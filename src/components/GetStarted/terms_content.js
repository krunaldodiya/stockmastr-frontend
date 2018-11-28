import { Content } from "native-base";
import React from "react";
import HTMLView from "react-native-htmlview";
import styles from "./styles";

const TermsContent = props => (
  <Content style={styles.termsBody}>
    <HTMLView value={props.terms} />
  </Content>
);

export default TermsContent;

