import axios from "axios";
import { Container } from "native-base";
import React from "react";
import styles from "./styles";
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
      agree: false,
      terms: ""
    };
  }

  componentWillMount() {
    axios.get("http://192.168.2.200:8000/terms?lite").then(({ data }) => {
      this.setState({ terms: data });
    });
  }

  acceptTerms = () => {
    const { agree } = this.state;

    this.setState({ agree: !agree });
  };

  render() {
    const { agree, terms } = this.state;

    return (
      <Container style={styles.container}>
        <TermsHeader />
        <TermsContent {...this.props} terms={terms} />
        <TermsCheckBox acceptTerms={this.acceptTerms} agree={agree} />
        <TermsButton {...this.props} agree={agree} />
      </Container>
    );
  }
}

export default GetStartedScreen;
