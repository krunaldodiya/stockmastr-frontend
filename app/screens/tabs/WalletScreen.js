import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/SettingsTab";
import TopBar from "../../components/TopBar";
import theme from "../../libs/theme";

class WalletScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  render() {
    const { loaded } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TopBar />

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
              {"\u20B9"} 1,250
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
      </View>
    );
  }
}

export default WalletScreen;
