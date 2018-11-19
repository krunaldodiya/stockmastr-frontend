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
import { graph } from "../../services";
import { api } from "../../libs/api";
import pusher from "../../libs/pusher";

const moment = require("moment");

class WalletScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: null,
      authUser: null,
      filter: "success"
    };
  }

  async componentWillMount() {
    this.setState({ loaded: false });
    const { user } = await graph(api.me, {});
    this.setState({ authUser: user, loaded: true });

    const socket = await pusher();
    const channel = socket.subscribe(`order-status-updated.${user.id}`);

    channel.bind("App\\Events\\UpdateOrderStatus", data => {
      this.setState({ authUser: data.user });
    });
  }

  getColor = status => {
    if (status === "success") return "green";
    if (status === "failed") return "red";
    if (status === "pending") return "orange";
  };

  showLoader = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  showAmountMenu = (authUser, navigation) => {
    const { wallet } = authUser;

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
          onPress={() => navigation.push("AddMoneyScreen", { authUser })}
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

  showTransactionBar = () => (
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
            onPress={() => this.setState({ filter: status })}
            style={{
              height: 18,
              width: 18,
              marginRight: 15,
              backgroundColor: this.getColor(status),
              borderRadius: 30
            }}
          />
        ))}
      </View>
    </View>
  );

  showTransactions = authUser => {
    const { wallet } = authUser;
    const { filter } = this.state;

    const transactions = wallet.transactions.filter(
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

  render() {
    const { loaded, authUser } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TopBar />

        {!loaded && this.showLoader()}

        {loaded && (
          <View style={{ flex: 1 }}>
            {this.showAmountMenu(authUser, navigation)}

            <View>
              {this.showTransactionBar()}

              {this.showTransactions(authUser)}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default WalletScreen;
