import React from "react";
import { WebView } from "react-native";

const TermsContent = props => {
  return (
    <WebView
      source={{ html: props.terms }}
      style={{ backgroundColor: "transparent", marginHorizontal: 10 }}
    />
  );
};

export default TermsContent;
