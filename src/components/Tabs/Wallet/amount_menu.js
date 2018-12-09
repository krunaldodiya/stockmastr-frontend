import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import theme from "../../../libs/theme";

const AmountMenu = props => {
  const { auth, navigation } = props;
  const { authUser } = auth;
  const { wallet } = authUser;

  console.log(props);
  
  return (
    <View
      style={{
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: theme.fonts.TitilliumWebSemiBold
          }}
        >
          Amount
        </Text>

        <View style={{ height: 5 }} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: theme.fonts.TitilliumWebRegular
          }}
        >
          {"\u20B9"} {wallet.balance}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.push("AddMoneyScreen")}
        style={{
          backgroundColor: "#48A2F8",
          justifyContent: "center",
          height: 40,
          width: 100,
          borderRadius: 10,
          marginTop: 10
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 12,
            fontFamily: theme.fonts.TitilliumWebBold
          }}
        >
          ADD MONEY
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmountMenu;
