import React from "react";
import {
  View,
  WebView,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from "react-native";
import { api } from "../libs/api";
import styles from "../styles/AddMoneyScreen";
import IconSet from "../libs/icon_set";

class AddMoneyScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      authUser: null
    };
  }

  async componentWillMount() {
    const { authUser } = this.props.navigation.state.params;

    this.setState({ authUser, loaded: true });
  }

  showLoader = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="small" color="#000" />
    </View>
  );

  render() {
    const { loaded, authUser } = this.state;
    const { navigation } = this.props;

    const url = `${api.createOrder}?user_id=${authUser.id}`;

    if (!loaded) {
      return this.showLoader();
    }

    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "skyblue" }}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => navigation.goBack()}
          >
            <IconSet
              name="navigate-before"
              type="MaterialIcons"
              color="black"
              size={32}
              style={{ marginLeft: 5, marginVertical: 10 }}
            />

            <Text style={styles.text}>ADD MONEY</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <WebView source={{ uri: url }} />
        </View>
      </View>
    );
  }
}

export default AddMoneyScreen;
