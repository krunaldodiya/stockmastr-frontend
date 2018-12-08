import React from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
// component
import Loader from "../../components/shared/Loader";
import RequestOtpForm from "./form";
import TopImage from "./image";
import Info from "./info";
// styles
import styles from "./styles";

class RequestOtp extends React.Component {
  render() {
    const { guest } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <Loader loading={guest.loading} />
          <TopImage />
          <Info />
          <RequestOtpForm {...this.props} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default RequestOtp;
