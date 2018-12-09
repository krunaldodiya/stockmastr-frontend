import React from "react";
import { ScrollView, Text, View } from "react-native";
import theme from "../../../libs/theme";

Transactions = props => {
  const { auth, filter } = props;
  const { authUser } = auth;

  const transactions = authUser.wallet.transactions.filter(
    transaction => transaction["status"] === filter
  );

  if (!transactions.length) {
    return (
      <View style={{ paddingTop: 10, paddingLeft: 20 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: theme.fonts.TitilliumWebRegular
          }}
        >
          No {filter !== "success" && filter} Transactions Yet.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {transactions.map(transaction => (
        <View
          key={transaction.transaction_id}
          style={{
            flexDirection: "row",
            paddingVertical: 10
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              borderLeftWidth: 3,
              borderLeftColor: this.getColor(transaction.status),
              paddingHorizontal: 10
            }}
          >
            <Text
              style={{
                fontFamily: theme.fonts.TitilliumWebSemiBold,
                fontSize: 12
              }}
            >
              {moment(transaction.created_at).format("Do MMM")} {""}
            </Text>

            <Text
              style={{
                fontFamily: theme.fonts.TitilliumWebSemiBold,
                fontSize: 16
              }}
            >
              {moment(transaction.created_at).format("YYYY")} {""}
            </Text>

            <Text
              style={{
                fontFamily: theme.fonts.TitilliumWebRegular,
                fontSize: 12,
                marginTop: 10,
                color: "#333"
              }}
            >
              {moment(transaction.created_at).format("hh:mm A")}
            </Text>
          </View>

          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontFamily: theme.fonts.TitilliumWebSemiBold,
                fontSize: 16,
                marginBottom: 5
              }}
            >
              {transaction.meta.description}
            </Text>

            <Text
              style={{
                fontFamily: theme.fonts.TitilliumWebRegular,
                fontSize: 10,
                marginBottom: 5,
                color: "gray"
              }}
            >
              {transaction.transaction_id}
            </Text>

            <Text
              style={{
                fontFamily: theme.fonts.TitilliumWebRegular,
                fontSize: 14,
                color: this.getColor(transaction["status"])
              }}
            >
              {transaction.status}
            </Text>
          </View>

          <View style={{ flex: 1, paddingRight: 20 }}>
            <Text
              style={{
                textAlign: "right",
                fontFamily: theme.fonts.TitilliumWebSemiBold,
                color: this.getColor(transaction["status"])
              }}
            >
              {transaction.transaction_type === "deposit" ? "+" : "-"}{" "}
              {transaction.amount}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Transactions;
