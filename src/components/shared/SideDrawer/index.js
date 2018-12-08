import React from "react";
import { SafeAreaView, Dimensions } from "react-native";
import SideMenu from "react-native-side-menu";
import Menu from "./menu";

change = (drawer, toggleDrawer) => {
  if (drawer.isOpen) {
    toggleDrawer({ isOpen: false });
  }
};

const SideDrawer = props => {
  const { drawer, toggleDrawer } = props;

  return (
    <SideMenu
      menu={<Menu />}
      openMenuOffset={Dimensions.get("window").width * 0.75}
      isOpen={drawer.isOpen}
      onChange={() => this.change(drawer, toggleDrawer)}
    >
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
    </SideMenu>
  );
};

export default SideDrawer;
