import { Text, View } from "native-base";
import React from "react";
import theme from "../../../libs/theme";

Menu = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fefefe",
        borderRightWidth: 1,
        borderRightColor: "#e6e6e6"
      }}
    >
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#e6e6e6"
        }}
      >
        <Text
          style={{
            color: "#000",
            fontFamily: theme.fonts.TitilliumWebSemiBold,
            fontSize: 20
          }}
        >
          Menu
        </Text>
      </View>
    </View>
  );
};

export default Menu;