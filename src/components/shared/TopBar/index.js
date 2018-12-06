import { Icon } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const TopBar = props => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => props.toggleDrawer()}
        >
          <Icon
            type="Feather"
            size={24}
            color="black"
            name="menu"
          />

          <Text style={styles.name}>SocialStock</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Icon
          type="Feather"
          size={18}
          color="black"
          name="search"
        />
      </View>
    </View>
  );
};

export default TopBar;
