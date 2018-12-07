import { Container } from "native-base";
import React from "react";
import NewsContent from "./news_content";
import NewsHeader from "./news_header";
// components
import styles from "./styles";

class NewsDetail extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <NewsHeader {...this.props} />
        <NewsContent {...this.props} />
      </Container>
    );
  }
}

export default NewsDetail;
