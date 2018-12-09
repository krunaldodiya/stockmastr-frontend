import React from "react";
import { WebView } from "react-native";
import { api } from "../../libs/api";

const ContentBody = props => {
  const { auth } = props;
  const { authUser } = auth;

  return (
    <WebView
      source={{ uri: `${api.createOrder}?user_id=${authUser.id}` }}
      style={{ flex: 1 }}
    />
  );
};

export default ContentBody;
