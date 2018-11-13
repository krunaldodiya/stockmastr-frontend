import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import theme from "../libs/theme";
import IconSet from "../libs/icon_set";

const TopBar = props => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
      }}
    >
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <IconSet
            type="Feather"
            size={24}
            color="black"
            name="menu"
            style={{ marginLeft: 5, marginTop: 1 }}
          />

          <Text
            style={{
              justifyContent: "center",
              marginLeft: 15,
              fontSize: 18,
              fontFamily: theme.fonts.TitilliumWebSemiBold
            }}
          >
            SocialStock
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <IconSet
          type="Feather"
          size={22}
          color="black"
          name="search"
          style={{ marginRight: 5, marginTop: 1 }}
        />
      </View>
    </View>
  );
};

export default TopBar;
