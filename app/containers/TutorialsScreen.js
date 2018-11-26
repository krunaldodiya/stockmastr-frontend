import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// 3rd party
import LottieView from "lottie-react-native";
// styles
import styles from "../styles/TutorialsScreen";
import theme from "../libs/theme";

const animation = require("../../assets/js/graduating_engineer.json");

export default class TutorialsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: true
    };
  }

  noAnimationPlease = () => {
    const { navigation } = this.props;

    this.setState({ animate: false }, () => {
      navigation.goBack();
    });
  };

  render() {
    const { animate } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => this.noAnimationPlease()}
        >
          <Icon
            name="navigate-before"
            color="black"
            size={32}
            style={{ marginLeft: 5, marginVertical: 10 }}
          />

          <Text style={styles.text}>TUTORIALS</Text>
        </TouchableOpacity>

        {animate && (
          <View style={{ flex: 1 }}>
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
                Brand new tutorials will give you detailed knowledge and keep
                you updated with stock market
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
