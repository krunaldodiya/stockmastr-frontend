import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Text } from "native-base";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

export default class ChannelDetail extends React.Component {
  constructor(props) {
    super(props);
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
              this.props.navigation.navigate("EditChannelScreen", {
                type: "navigate"
              })
            }
          >
            <Text style={styles.text}>Edit Channel</Text>
          </MenuOption>

          {this.props.getAuthUser.user &&
            this.props.getAuthUser.user.type == "provider" && (
              <MenuOption
                onSelect={() =>
                  this.props.navigation.navigate("SubmitReviewScreen", {
                    channel_id: this.props.getChannelById.channel.id
                  })
                }
              >
                <Text style={styles.text}>Submit Review</Text>
              </MenuOption>
            )}

            {this.props.getAuthUser.user &&
            this.props.getAuthUser.user.type == "provider" && (
              <MenuOption
                onSelect={() =>
                  this.props.navigation.navigate("ChannelSubscriberScreen", {
                    channel_id: this.props.getChannelById.channel.id
                  })
                }
              >
                <Text style={styles.text}>Channel Subscribers</Text>
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
