import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Text } from "native-base";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ currentTab: props.currentTab });
  }

  render() {
    return (
      <Menu>
        <MenuTrigger>
          <Icon name="more" style={styles.icon} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() =>
              this.props.navigation.navigate("UserDetailScreen", {
                user_id: this.props.getAuthUser.user.id
              })
            }
          >
            <Text style={styles.text}>View Profile</Text>
          </MenuOption>

          <MenuOption
            onSelect={() =>
              this.props.navigation.navigate("ManageProfileScreen", {
                type: "navigate"
              })
            }
          >
            <Text style={styles.text}>Edit Profile</Text>
          </MenuOption>

          {this.props.getAuthUser.user &&
            this.props.getAuthUser.user.type == "provider" && (
              <MenuOption
                onSelect={() =>
                  this.props.navigation.navigate("CreateChannelScreen")
                }
              >
                <Text style={styles.text}>Create a Channel</Text>
              </MenuOption>
            )}
        </MenuOptions>
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 5
  },

  icon: {
    color: "white",
    padding: 5
  }
});
