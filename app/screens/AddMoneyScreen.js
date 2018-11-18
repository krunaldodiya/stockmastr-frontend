import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  WebView,
  Modal,
  TextInput,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { api } from "../libs/api";
import styles from "../styles/AddMoneyScreen";
import theme from "../libs/theme";
import { processTransaction } from "../services";
import IconSet from "../libs/icon_set";

class AddMoneyScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      authUser: null,
      mobile: null,
      amount: null,
      showModal: false,
      status: null
    };
  }

  async componentWillMount() {
    const { authUser } = this.props.navigation.state.params;

    this.setState({ authUser, mobile: authUser.mobile, loaded: true });
  }

  handleNavigation = async info => {
    const { url, loading, title } = info;

    if (!loading && url === api.paymentResponse) {
      const { success, transaction_id } = JSON.parse(title);

      const transaction = await graph(api.processOrder, {
        transaction_id,
        success
      });

      console.log(transaction);

      this.setState({
        status: success ? "success" : "failed",
        showModal: false
      });
    }
  };

  showPaymentGatewayModal = () => {
    const { authUser, mobile, amount, showModal } = this.state;

    const url = `${api.paymentRequest}?amount=${amount}&userId=${
      authUser.id
    }&mobile=${mobile}`;

    return (
      <Modal
        visible={showModal}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <WebView
          useWebKit
          startInLoadingState
          scalesPageToFit
          source={{ uri: url }}
          onNavigationStateChange={info => this.handleNavigation(info)}
        />
      </Modal>
    );
  };

  showLoader = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  render() {
    const { loaded, status, showModal, mobile, amount } = this.state;
    const { navigation } = this.props;

    if (!loaded) {
      return this.showLoader();
    }

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

        {!status && (
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <IconSet
                type="Entypo"
                name="wallet"
                size={100}
                style={{
                  textAlign: "center",
                  color: "#48A2F8"
                }}
              />
            </View>

            <View style={{ flex: 2, justifyContent: "center" }}>
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
          </View>
        )}

        {status && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                textAlign: "center",
                color: status === "success" ? "green" : "red",
                fontSize: 22,
                fontFamily: theme.fonts.TitilliumWebSemiBold
              }}
            >
              {status === "success"
                ? "Transaction Successful !"
                : "Transaction Failed !"}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default AddMoneyScreen;
