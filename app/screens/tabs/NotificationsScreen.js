import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/NotificationsTab";
import TopBar from "../../components/TopBar";

import { graph } from "../../services";
import { api } from "../../libs/api";
// import echo from "../../libs/echo";

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

  async componentWillMount() {
    // const socket = await echo();
    // const channel = socket.subscribe("hello");
    // channel.bind("App\\Events\\Test", data => {
    //   console.log("hello from pusher", data);
    // });

    try {
      const data = await graph(api.test, {});
      console.log(data);
    } catch (error) {
      //
    }
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
