import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import theme from "../../../libs/theme";

const getColor = status => {
  if (status === "success") return "green";
  if (status === "failed") return "red";
  if (status === "pending") return "orange";
};

const TransactionMenu = props => {
  const { filterTransactions } = props;

  return (
    <View
      style={{
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: theme.fonts.TitilliumWebSemiBold
          }}
        >
          Transactions
        </Text>
      </View>

      <View style={{ flexDirection: "row", marginTop: 7 }}>
        {["success", "failed", "pending"].map(status => (
          <TouchableOpacity
            key={status}
            onPress={() => filterTransactions({ filter: status })}
            style={{
              height: 18,
              width: 18,
              marginRight: 15,
              backgroundColor: getColor(status),
              borderRadius: 30
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default TransactionMenu;
