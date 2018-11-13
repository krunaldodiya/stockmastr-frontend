import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/SettingsTab";
import TopBar from "../../components/TopBar";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  render() {
    const { loaded } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TopBar />

        <View style={{ padding: 20 }}>
          <Text>settings</Text>
        </View>
      </View>
    );
  }
}

export default SettingsScreen;
