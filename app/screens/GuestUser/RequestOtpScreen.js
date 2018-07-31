import React from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import { View, Text, Input, Button, Container, Form, Item } from "native-base";

// components
import Logo from "../../components/Logo";
import { requestOtp } from "../../libs/otp";
import theme from "../../libs/theme";

class RequestOtpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: null,
      loading: false
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Logo />

        <Container
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: theme.background.secondary,
            alignItems: "center"
          }}
        >
          <Form>
            <View style={{ flex: 1 }}>
              <Item
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Input
                  onFocus={() => this.updateMobile("+91")}
                  style={{
                    paddingLeft: 20,
                    borderColor: theme.background.primary
                  }}
                  onSubmitEditing={() => this.requestOtp()}
                  onChangeText={mobile => this.updateMobile(mobile)}
                  underlineColorAndroid="transparent"
                  value={this.state.mobile}
                  placeholder="+919876543210"
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "phone-pad"
                  }
                  maxLength={13}
                  returnKeyType="next"
                />
              </Item>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end"
              }}
            >
              <Item
                style={{
                  marginBottom: 20,
                  marginTop: 20,
                  marginLeft: 10,
                  marginRight: 10
                }}
              >
                <Button
                  style={styles.submitButton}
                  onPress={() => this.requestOtp()}
                >
                  <Text style={{ width: "100%", textAlign: "center" }}>
                    {this.state.loading ? "Please, Wait..." : "REQUEST OTP"}
                  </Text>
                </Button>
              </Item>
            </View>
          </Form>
        </Container>
      </View>
    );
  }

  updateMobile(mobile) {
    this.setState({ mobile });
  }

  updateType(type) {
    this.setState({ type });
  }

  validMobile(mobile) {
    let validMobile =
      mobile && mobile.match(new RegExp("^([0|+[0-9]{1,5})?([7-9][0-9]{9})$"));

    if (!validMobile) {
      Alert.alert(
        "Error",
        "Invalid Mobile Number",
        [{ text: "OK", onPress: () => this.setState({ loading: false }) }],
        { cancelable: false }
      );
    }

    return validMobile;
  }

  requestOtp() {
    this.setState({ loading: true });

    const { mobile } = this.state;
    if (!this.validMobile(mobile)) return this.setState({ loading: false });

    requestOtp(this.state.mobile, __DEV__).then(response => {
      this.props.navigation.replace("VerifyOtpScreen", {
        otp: response.otp,
        mobile
      });
    });
  }
}

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 20,
    shadowColor: "#3f2201",
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.background.primary
  }
});

export default RequestOtpScreen;
