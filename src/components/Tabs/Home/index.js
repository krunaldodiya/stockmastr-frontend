import { Container } from "native-base";
import React from "react";
import SideDrawer from "../../shared/SideDrawer";
import TopBar from "../../shared/TopBar";
import BottomActionMenu from "./bottom_action_menu";
import GridMenu from "./grid_menu";
import NewsSlider from "./news";
import styles from "./styles";

class Home extends React.Component {
  componentDidMount() {
    const { news, loadNews } = this.props;

    if (!news.loading && !news.news.length) {
      return loadNews();
    }
  }

  render() {
    return (
      <SideDrawer {...this.props}>
        <Container style={styles.container}>
          <TopBar {...this.props} />
          <NewsSlider {...this.props} />
          <GridMenu {...this.props} />
          <BottomActionMenu {...this.props} />
        </Container>
      </SideDrawer>
    );
  }
}

export default Home;
