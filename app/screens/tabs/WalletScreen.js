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

class WalletScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      wallet: null
    };
  }

  async componentWillMount() {
    const { client } = this.props;

    const wallet = await getWallet(client, {});

    this.setState({ loaded: true, wallet });
  }

  render() {
    const { loaded, wallet } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TopBar />

        {!loaded && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}

        {loaded && (
          <View style={{ flex: 1 }}>
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

            <View
              style={{
                flex: 1,
                padding: 20
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: theme.fonts.TitilliumWebSemiBold
                  }}
                >
                  Transactions
                </Text>
              </View>

              <ScrollView>
                {wallet.transactions.map(transaction => (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      paddingVertical: 10
                    }}
                  >
                    <Text>{transaction.transaction_type}</Text>
                    <Text>{transaction.transaction_id}</Text>
                    <Text>{transaction.amount}</Text>
                    <Text>{transaction.status}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default compose(withApollo)(WalletScreen);
