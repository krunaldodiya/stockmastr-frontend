import axios from "axios";
import { Container } from "native-base";
import React from "react";
import { api } from "../../libs/api";
// components
import TermsForm from "./form";
import styles from "./styles";
import TermsContent from "./terms_content";
import TermsHeader from "./terms_header";

class GetStartedScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      terms: ""
    };
  }

  componentDidMount() {
    axios.get(`${api.terms}?lite`).then(({ data }) => {
      this.setState({ terms: data });
    });
  }

  render() {
    const { terms } = this.state;

    return (
      <Container style={styles.container}>
        <TermsHeader />
        <TermsContent {...this.props} terms={terms} />
        <TermsForm {...this.props} />
      </Container>
    );
  }
}

export default GetStartedScreen;
