import React from "react";
import { StyleSheet, TextInput } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Right,
  Body
} from "native-base";
import theme from "../libs/theme";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestUser: null,
      authUser: null,
      channel: null
    };
  }

  componentWillMount() {
    this.setState({ ...this.props });
  }

  sendMessage() {
      console.log("okay");
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                style={styles.icon}
                type="MaterialIcons"
                name="arrow-back"
                size={20}
                color="#000"
              />
            </Button>
          </Left>

          <Body>
            <Text style={{ color: "white" }} numberOfLines={1}>
              {this.state.channel
                ? this.state.channel.title
                : this.state.guestUser.name}
            </Text>
          </Body>

          <Right>
            <Button transparent>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                style={styles.icon}
                type="MaterialIcons"
                name="more-vert"
                size={20}
                color="#000"
              />
            </Button>
          </Right>
        </Header>

        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <View
            style={{ flex: 1, backgroundColor: theme.background.secondary }}
          >
            <Text>hello</Text>
          </View>

          <View>
            <TextInput
              value={this.state.keywords}
              onChangeText={keywords => this.setState({ keywords })}
              onSubmitEditing={() => this.sendMessage()}
              clearButtonMode="never"
              underlineColorAndroid="transparent"
              placeholder="Search Channels"
              placeholderTextColor="#ccc"
              autoFocus={true}
              returnKeyType="search"
              style={styles.chatInput}
            />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    backgroundColor: theme.background.primary
  },

  text: {
    padding: 10,
    color: "white",
    fontSize: 18
  },

  icon: {
    color: "white",
    fontSize: 24
  },

  chatInput: {
    padding: 10
  }
});
