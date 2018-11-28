import axios from "axios";
import { Container } from "native-base";
import React from "react";
import styles from "./styles";
// components
import TermsButton from "./terms_button";
import TermsCheckBox from "./terms_check_box";
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
    axios.get("http://192.168.2.200:8000/terms?lite").then(({ data }) => {
      this.setState({ terms: data });
    });
  }

  render() {
    const { terms } = this.state;

    return (
      <Container style={styles.container}>
        <TermsHeader />
        <TermsContent {...this.props} terms={terms} />
        <TermsCheckBox {...this.props} />
        <TermsButton {...this.props} />
      </Container>
    );
  }
}

export default GetStartedScreen;
