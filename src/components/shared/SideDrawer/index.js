import { Container } from "native-base";
import React from "react";
import { Dimensions, SafeAreaView } from "react-native";
import SideMenu from "react-native-side-menu";
import TopBar from "../TopBar";
import Menu from "./menu";

change = (drawer, toggleDrawer) => {
  if (drawer.isOpen) {
    toggleDrawer({ isOpen: false });
  }
};

const SideDrawer = props => {
  const { drawer, toggleDrawer } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SideMenu
        menu={<Menu {...props} />}
        openMenuOffset={Dimensions.get("window").width * 0.75}
        isOpen={drawer.isOpen}
        onChange={() => this.change(drawer, toggleDrawer)}
      >
        <Container style={{ flex: 1 }}>
          <TopBar {...props} />
          {props.children}
        </Container>
      </SideMenu>
    </SafeAreaView>
  );
};

export default SideDrawer;
