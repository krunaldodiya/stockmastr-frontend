import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// 3rd party
import LottieView from "lottie-react-native";
// styles
import styles from "../styles/TutorialsScreen";

const like = require("../../assets/js/like.json");

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

        {animate && <LottieView source={like} autoPlay style={{ top: 50 }} />}
      </View>
    );
  }
}
