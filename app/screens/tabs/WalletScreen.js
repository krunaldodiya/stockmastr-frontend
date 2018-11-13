import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import styles from "../../styles/WalletTab";
import TopBar from "../../components/TopBar";
import theme from "../../libs/theme";
import { compose, withApollo } from "react-apollo";
import { getWallet } from "../../services";
const moment = require("moment");

class WalletScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      wallet: null,
      filter: "success"
    };
  }

  async componentWillMount() {
    const { client, navigation } = this.props;

    navigation.addListener("willFocus", async () => {
      const wallet = await getWallet(client, {});

      this.setState({ loaded: true, wallet });
    });
  }

  showTop = wallet => {
    const { navigation } = this.props;

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

  getColor = status => {
    if (status === "success") return "green";
    if (status === "failed") return "red";
    if (status === "pending") return "orange";
  };

  showTransactions = wallet => {
    const { filter } = this.state;

    if (!wallet.transactions.length) {
      return (
        <View style={{ marginTop: 5 }}>
          <Text>No Transactions Yet.</Text>
        </View>
      );
    }

    const transactions = wallet.transactions.filter(
      transaction => transaction["status"] === filter
    );

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

            <View style={{ flex: 1, paddingRight: 10 }}>
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

  render() {
    const { loaded, wallet } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TopBar />

        <View style={{ flex: 1 }}>
          {this.showTop(wallet)}

          <View
            style={{
              flex: 1
            }}
          >
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
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: theme.fonts.TitilliumWebSemiBold
                  }}
                >
                  Transactions
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => this.setState({ filter: "success" })}
                  style={{
                    height: 15,
                    width: 15,
                    backgroundColor: "green",
                    borderRadius: 30,
                    marginTop: 10,
                    marginLeft: 10
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ filter: "failed" })}
                  style={{
                    height: 15,
                    width: 15,
                    backgroundColor: "red",
                    borderRadius: 30,
                    marginTop: 10,
                    marginLeft: 10
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ filter: "pending" })}
                  style={{
                    height: 15,
                    width: 15,
                    backgroundColor: "orange",
                    borderRadius: 30,
                    marginTop: 10,
                    marginLeft: 10
                  }}
                />
              </View>
            </View>

            {this.showTransactions(wallet)}
          </View>
        </View>
      </View>
    );
  }
}

export default compose(withApollo)(WalletScreen);
