import { Text, View } from "native-base";
import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import theme from "../../../libs/theme";

logout = navigation => {
  navigation.replace("GetStartedScreen");
};

Menu = props => {
  const { navigation } = props;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fefefe",
        borderRightWidth: 1,
        borderRightColor: "#e6e6e6"
      }}
    >
      <View style={{ flex: 1 }}>
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

        <View
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#e6e6e6"
          }}
        >
          <TouchableOpacity onPress={() => this.logout(navigation)}>
            <Text
              style={{
                color: "#000",
                fontFamily: theme.fonts.TitilliumWebRegular,
                fontSize: 16
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
