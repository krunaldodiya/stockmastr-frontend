import React from "react";
import { KeyboardAvoidingView } from "react-native";
// component
import Loader from "../../components/shared/Loader";
import VerifyOtpForm from "./form";
import TopImage from "./image";
import Info from "./info";
// styles
import styles from "./styles";
import Timer from "./timer";

const VerifyOtp = props => {
  const { guest } = props;
  const { loading, mobile } = guest;

  return (
    <KeyboardAvoidingView behavior="position" enabled style={styles.container}>
      <Loader loading={loading} />
      <TopImage />
      <Info mobile={mobile} />
      <Timer navigation={props.navigation} />
      <VerifyOtpForm {...props} />
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;
