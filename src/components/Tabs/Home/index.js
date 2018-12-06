import { Container } from "native-base";
import React from "react";
import TopBar from "../../shared/TopBar";
import BottomActionMenu from "./bottom_action_menu";
import GridMenu from "./grid_menu";
import NewsSlider from "./news";
import styles from "./styles";

const Home = props => {
  return (
    <Container style={styles.container}>
      <TopBar {...props} />
      <NewsSlider {...props} />
      <GridMenu {...props} />
      <BottomActionMenu {...props} />
    </Container>
  );
};

export default Home;
