import React from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
// component
import Loader from "../../components/shared/Loader";
import VerifyOtpForm from "./form";
import TopImage from "./image";
import Info from "./info";
// styles
import styles from "./styles";
import Timer from "./timer";

class VerifyOtp extends React.Component {
  render() {
    const { guest, navigation } = this.props;
    const { loading, mobile } = guest;

    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <Loader loading={loading} />
          <TopImage />
          <Info mobile={mobile} />
          <Timer navigation={navigation} />
          <VerifyOtpForm {...this.props} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default VerifyOtp;
