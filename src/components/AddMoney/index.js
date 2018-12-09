import { Container } from "native-base";
import React from "react";
import ContentBody from "./content_body";
import ContentHeader from "./content_header";
import styles from "./styles";

class AddMoney extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <ContentHeader {...this.props} />
        <ContentBody {...this.props} />
      </Container>
    );
  }
}

export default AddMoney;
