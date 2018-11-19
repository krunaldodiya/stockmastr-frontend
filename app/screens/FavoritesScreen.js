import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// styles
import styles from "../styles/FavoritesScreen";
import theme from "../libs/theme";
import IconSet from "../libs/icon_set";

export default class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      pin: []
    };
  }

  setDigit = number => {
    const { pin } = this.state;

    if (pin.length < 4) {
      const data = [...pin, number];

      this.setState({ pin: data });
    }
  };

  unsetDigit = () => {
    const { pin } = this.state;

    if (pin.length > 0) {
      pin.pop();

      this.setState({ pin });
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
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

          <Text style={styles.text}>FAVORITES</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
