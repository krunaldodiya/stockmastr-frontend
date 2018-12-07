import React from "react";
import { Dimensions } from "react-native";
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
      {props.children}
    </SideMenu>
  );
};

export default SideDrawer;
