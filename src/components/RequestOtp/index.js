import { Container, Content } from "native-base";
import React from "react";
// component
import Loader from "../../components/shared/Loader";
import RequestOtpForm from "./form";
import TopImage from "./image";
import Info from "./info";
// styles
import styles from "./styles";

const RequestOtp = props => (
  <Container style={styles.container}>
    <Content>
      <Loader loading={props.guest.loading} />
      <TopImage />
      <Info />
      <RequestOtpForm {...props} />
    </Content>
  </Container>
);

export default RequestOtp;
