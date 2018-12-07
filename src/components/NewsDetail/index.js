import { Container } from "native-base";
import React from "react";
// components
import styles from "./styles";
import NewsContent from "./news_content";
import NewsHeader from "./news_header";

class NewsDetail extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <NewsHeader />
        <NewsContent {...this.props} />
      </Container>
    );
  }
}

export default NewsDetail;
