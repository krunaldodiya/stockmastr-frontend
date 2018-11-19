import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/NotificationsTab";
import TopBar from "../../components/TopBar";

class NotificationsScreen extends React.Component {
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
          <Text>notifications</Text>
        </View>
      </View>
    );
  }
}

export default NotificationsScreen;
