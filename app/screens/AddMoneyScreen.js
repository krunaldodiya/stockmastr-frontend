import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  WebView,
  Modal,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { api } from "../libs/api";
import styles from "../styles/AddMoneyScreen";
import theme from "../libs/theme";

export default class AddMoneyScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      userId: 1,
      mobile: "9426726815",
      amount: null,
      showModal: false
    };
  }

  handleNavigation = info => {
    const { url, loading, title } = info;

    if (!loading && url === api.paymentResponse) {
      this.setState({ message: title, showModal: false });
    }
  };

  showPaymentGatewayModal = () => {
    const { userId, mobile, amount, showModal } = this.state;
    const url = `${
      api.paymentRequest
    }?amount=${amount}&userId=${userId}&mobile=${mobile}`;

    return (
      <Modal
        visible={showModal}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={state => this.handleNavigation(state)}
        />
      </Modal>
    );
  };

  render() {
    const { message, showModal, mobile, amount } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="navigate-before"
            color="black"
            size={32}
            style={{ marginLeft: 5, marginVertical: 10 }}
          />

          <Text style={styles.text}>ADD MONEY</Text>
        </TouchableOpacity>

        {showModal && this.showPaymentGatewayModal()}

        {!message && (
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <View>
              <TextInput
                value={mobile}
                onChangeText={value => this.setState({ mobile: value })}
                style={styles.textInput}
                placeholder="Mobile Number"
                keyboardType="numeric"
              />
            </View>

            <View>
              <TextInput
                value={amount}
                onChangeText={value => this.setState({ amount: value })}
                style={styles.textInput}
                placeholder={"Amount ( Multiple of \u20B9 1,000 )"}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              onPress={() => this.setState({ showModal: true })}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>ADD MONEY</Text>
            </TouchableOpacity>
          </View>
        )}

        {message && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                color: message === "success" ? "green" : "red",
                fontSize: 22,
                fontFamily: theme.fonts.TitilliumWebSemiBold
              }}
            >
              {message}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
