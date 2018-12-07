import { Container } from "native-base";
import React from "react";
import SideDrawer from "../../shared/SideDrawer";
import TopBar from "../../shared/TopBar";
import NewsList from "./news_list";
import styles from "./styles";

class Home extends React.Component {
  constructor(props) {
    super(props);

    const { news } = props;

    this.state = {
      news: news.news,
      paginatedNews: [],
      page: 1
    };
  }

  componentDidMount() {
    this.getPaginatedNews();
  }

  loadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 }, this.getPaginatedNews);
  };

  getPaginatedNews = () => {
    const { news, page } = this.state;
    const limit = page * 20;

    if (limit < news.length) {
      const paginatedNews = news.splice(0, page * 20);
      this.setState({ paginatedNews });
    }

    if (limit >= news.length) {
      this.setState({ paginatedNews: news });
    }
  };

  render() {
    const { paginatedNews } = this.state;

    return (
      <SideDrawer {...this.props}>
        <Container style={styles.container}>
          <TopBar {...this.props} />

          <NewsList
            {...this.props}
            paginatedNews={paginatedNews}
            loadMore={this.loadMore}
          />
        </Container>
      </SideDrawer>
    );
  }
}

export default Home;
