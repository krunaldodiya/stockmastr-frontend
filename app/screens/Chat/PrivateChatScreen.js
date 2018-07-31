import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";

// component
import PrivateChat from "../../components/Chat/PrivateChat";

export default class PrivateChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channel: null,
      authUser: null,
      guestUser: null,
      loading: true
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    this.setState({
      authUser: params.authUser,
      guestUser: params.guestUser,
      loading: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PrivateChat
          {...this.props}
          authUser={this.state.authUser}
          guestUser={this.state.guestUser}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
