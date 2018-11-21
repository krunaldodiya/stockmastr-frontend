import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/NotificationsTab";
import TopBar from "../../components/TopBar";

import { connect } from "react-redux";

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

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    const { loaded } = this.state;
    const { home, hello } = this.props;

    return (
      <View style={styles.container}>
        <TopBar />

        <View style={{ padding: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text>{home.name}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              return hello({
                type: "LOADING",
                payload: { name: "krunal" }
              });
            }}
          >
            <Text>PRESS ME</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    home: state.home
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hello: payload => dispatch(payload)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
