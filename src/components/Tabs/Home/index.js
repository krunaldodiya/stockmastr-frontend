import React from "react";
import SideDrawer from "../../shared/SideDrawer";
import BottomActionMenu from "./bottom_action_menu";
import GridMenu from "./grid_menu";
import NewsSlider from "./news";

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
        <NewsSlider {...this.props} />
        <GridMenu {...this.props} />
        <BottomActionMenu {...this.props} />
      </SideDrawer>
    );
  }
}

export default Home;
