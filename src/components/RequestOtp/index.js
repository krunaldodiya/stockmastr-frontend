import React from "react";
import { KeyboardAvoidingView } from "react-native";
// component
import Loader from "../../components/shared/Loader";
import RequestOtpForm from "./form";
import TopImage from "./image";
import Info from "./info";
// styles
import styles from "./styles";

const RequestOtp = props => (
  <KeyboardAvoidingView behavior="position" enabled style={styles.container}>
    <Loader loading={props.guest.loading} />
    <TopImage />
    <Info />
    <RequestOtpForm {...props} />
  </KeyboardAvoidingView>
);

export default RequestOtp;
