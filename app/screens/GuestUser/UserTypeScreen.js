import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button, Item, Icon } from "native-base";

// components
import Logo from "../../components/Logo";

import { compose, withApollo, graphql } from "react-apollo";
import { UPDATE_USER_MUTATION, GET_AUTH_USERS_QUERY } from "../../graphql";
import theme from "../../libs/theme";

class UserTypeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.navigation.state.params.type
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Logo />
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: theme.background.secondary,
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <View>
            <Item
              style={{
                borderBottomWidth: 0,
                paddingTop: 20,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Button
                style={[
                  {
                    flex: 1,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: "white"
                  },
                  this.state.type == "trader" && {
                    backgroundColor: theme.background.primary
                  }
                ]}
                onPress={() => this.updateData("type", "trader")}
              >
                <Text
                  style={[
                    { fontSize: 14, color: "black" },
                    this.state.type == "trader" && { color: "white" }
                  ]}
                >
                  Trader
                </Text>

                {this.state.type == "trader" && (
                  <Icon type="Ionicons" name="ios-checkmark" />
                )}
              </Button>
              <Button
                style={[
                  {
                    flex: 1,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    backgroundColor: "white"
                  },
                  this.state.type == "provider" && {
                    backgroundColor: theme.background.primary
                  }
                ]}
                onPress={() => this.updateData("type", "provider")}
              >
                <Text
                  style={[
                    { fontSize: 14, color: "black" },
                    this.state.type == "provider" && {
                      color: "white"
                    }
                  ]}
                >
                  Provider
                </Text>

                {this.state.type == "provider" && (
                  <Icon type="Ionicons" name="ios-checkmark" />
                )}
              </Button>
            </Item>

            <Item
              style={{
                marginBottom: 20,
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Button
                style={styles.submitButton}
                disabled={this.state.loading}
                onPress={() => this.updateUserType()}
              >
                <Text style={{ width: "100%", textAlign: "center" }}>
                  {this.state.loading ? "Please, Wait..." : "Next"}
                </Text>
              </Button>
            </Item>
          </View>
        </View>
      </View>
    );
  }

  updateData(key, value) {
    this.setState({ [key]: value });
  }

  async updateUserType() {
    this.setState({ loading: true });

    this.props
      .updateUserMutation({
        variables: {
          id: this.props.getAuthUser.user.id,
          type: this.state.type
        }
      })
      .then(({ data }) => {
        this.props.navigation.replace("ManageProfileScreen", {
          type: "replace"
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
}

const styles = StyleSheet.create({
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

export default compose(
  withApollo,
  graphql(UPDATE_USER_MUTATION, { name: "updateUserMutation" }),
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUser" })
)(UserTypeScreen);
