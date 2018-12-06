import { Icon } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const TopBar = props => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => props.toggleDrawer()}>
          <Icon
            type="Feather"
            color="black"
            name="menu"
            style={{ fontSize: 28, textAlign: "center" }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 7 }}>
        <Text style={styles.name}>StockMastr</Text>
      </View>

      <View style={{ flex: props.drawer.open ? 2 : 1 }}>
        <TouchableOpacity onPress={() => props.toggleDrawer()}>
          <Icon
            type="Feather"
            color="black"
            name={props.drawer.open ? "menu" : "search"}
            style={{ fontSize: 28, textAlign: "center" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
