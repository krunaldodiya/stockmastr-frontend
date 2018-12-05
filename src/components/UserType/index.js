import React from "react";
import { KeyboardAvoidingView } from "react-native";
import Loader from "../../components/shared/Loader";
import UserTypeForm from "./form";
import TopImage from "./image";
import styles from "./styles";

const UserType = props => {
  return (
    <KeyboardAvoidingView behavior="position" enabled style={styles.container}>
      <Loader loading={props.auth.loading} />
      <TopImage />
      <UserTypeForm {...props} />
    </KeyboardAvoidingView>
  );
};

export default UserType;
