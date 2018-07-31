import React from "react";
import { NetInfo, StyleSheet } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Right
} from "native-base";

// components
import theme from "../libs/theme";

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionInfo: null
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    NetInfo.addEventListener("connectionChange", connectionInfo =>
      this.handleConnectionChanged(connectionInfo)
    );
    const connectionInfo = await NetInfo.getConnectionInfo();

    this.handleConnectionChanged(connectionInfo);
  }

  handleConnectionChanged(connectionInfo) {
    this.setState({ connectionInfo });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ color: "white" }}>Notifications</Text>
          </Body>
        </Header>

        <View>
          <Text>hi</Text>
        </View>
      </Container>
    );
  }

  acceptTerms() {
    this.props.navigation.replace("RequestOtpScreen");
  }
}

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  },

  submitButton: {
    borderRadius: 20,
    shadowColor: "#3f2201",
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.background.primary
  }
});

export default NotificationScreen;
