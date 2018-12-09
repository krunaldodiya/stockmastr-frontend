import LottieView from "lottie-react-native";
import { Text, View } from "native-base";
import React from "react";
import theme from "../../libs/theme";

const animation = require("../../../assets/js/graduating_engineer.json");

const ContentBody = props => {
  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <View style={{ flex: 5 }}>
        <LottieView source={animation} autoPlay style={{ top: 0 }} />
      </View>

      <View style={{ flex: 3 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: theme.fonts.TitilliumWebBold,
            fontSize: 32,
            color: "#fff"
          }}
        >
          Coming Soon !
        </Text>

        <Text
          style={{
            marginTop: 30,
            textAlign: "center",
            fontFamily: theme.fonts.TitilliumWebRegular,
            fontSize: 18,
            color: "#000",
            marginHorizontal: 20
          }}
        >
          Brand new tutorials will give you detailed knowledge and keep you
          updated with stock market
        </Text>
      </View>
    </View>
  );
};

export default ContentBody;
