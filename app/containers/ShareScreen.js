import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ShareMenu from "../components/ShareMenu";
import theme from "../libs/theme";

export default class WalletScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  hideShareMenu = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "skyblue" }}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="navigate-before"
            color="black"
            size={32}
            style={{ marginLeft: 5, marginVertical: 10 }}
          />

          <Text
            style={{
              marginLeft: 10,
              marginTop: 13,
              fontSize: 18,
              fontFamily: theme.fonts.TitilliumWebSemiBold
            }}
          >
            SHARE & RATE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
          <Text
            style={{
              paddingVertical: 15,
              paddingLeft: 47,
              fontSize: 18,
              fontFamily: theme.fonts.TitilliumWebRegular
            }}
          >
            Share the App
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
          <Text
            style={{
              paddingVertical: 15,
              paddingLeft: 47,
              fontSize: 18,
              fontFamily: theme.fonts.TitilliumWebRegular
            }}
          >
            Rate the App
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
          <Text
            style={{
              paddingVertical: 15,
              paddingLeft: 47,
              fontSize: 18,
              fontFamily: theme.fonts.TitilliumWebRegular
            }}
          >
            Like us on Facebook
          </Text>
        </TouchableOpacity>

        <ShareMenu visible={visible} hideShareMenu={this.hideShareMenu} />
      </View>
    );
  }
}
