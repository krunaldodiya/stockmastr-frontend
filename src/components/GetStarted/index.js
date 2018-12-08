import axios from "axios";
import { Container } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import { api } from "../../libs/api";
// components
import TermsForm from "./form";
import styles from "./styles";
import TermsContent from "./terms_content";
import TermsHeader from "./terms_header";

class GetStarted extends React.Component {
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
        <ImageBackground
          source={require("../../../assets/images/background.png")}
          style={{
            flex: 1,
            height: "172%",
            backgroundColor: "rgba(255,236,239, 0.5)"
          }}
          resizeMode="contain"
          resizeMethod="auto"
        >
          <TermsHeader />
          <TermsContent {...this.props} terms={terms} />
          <TermsForm {...this.props} />
        </ImageBackground>
      </Container>
    );
  }
}

export default GetStarted;
