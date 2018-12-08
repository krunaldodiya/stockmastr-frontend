import { Text, View } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import theme from "../../../libs/theme";

Menu = () => {
  return (
    <SafeAreaView
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
    </SafeAreaView>
  );
};

export default Menu;
