import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Input,
  Button,
  Container,
  Item,
  Icon,
  Header,
  Left,
  Body,
  Right,
  Spinner
} from "native-base";

// components
import { compose, graphql } from "react-apollo";
import { UPDATE_USER_MUTATION, GET_AUTH_USERS_QUERY } from "../../graphql";

// libs
import theme from "../../libs/theme";

class ManageProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      loading: true
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    this.setState({ authUser: this.props.getAuthUser.user, loading: false });
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
            <Text style={{ color: "white" }}>CREATE PROFILE</Text>
          </Body>
          <Right>
            <Icon
              type="MaterialIcons"
              name="check"
              style={styles.checkIcon}
              onPress={() => this.updateProfile()}
            />
          </Right>
        </Header>

        <View
          style={{
            flex: 1,
            backgroundColor: theme.background.secondary,
            padding: 10
          }}
        >
          {this.state.loading && (
            <Spinner
              color="#000"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          )}

          {!this.state.loading && (
            <View>
              <Item
                style={{
                  width: "100%",
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginBottom: 5,
                  marginLeft: 0
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14
                  }}
                  onChangeText={name => this.updateData("name", name)}
                  underlineColorAndroid="transparent"
                  value={this.state.authUser.name}
                  placeholder="Full Name"
                  returnKeyType="next"
                />
              </Item>

              <Item
                style={{
                  width: "100%",
                  borderBottomWidth: 0,
                  marginBottom: 5,
                  marginLeft: 0
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
                    this.state.authUser.gender == "male" && {
                      backgroundColor: theme.background.primary
                    }
                  ]}
                  onPress={() => this.updateData("gender", "male")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "black" },
                      this.state.authUser.gender == "male" && { color: "white" }
                    ]}
                  >
                    Male
                  </Text>

                  {this.state.authUser.gender == "male" && (
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
                    this.state.authUser.gender == "female" && {
                      backgroundColor: theme.background.primary
                    }
                  ]}
                  onPress={() => this.updateData("gender", "female")}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: "black" },
                      this.state.authUser.gender == "female" && {
                        color: "white"
                      }
                    ]}
                  >
                    Female
                  </Text>

                  {this.state.authUser.gender == "female" && (
                    <Icon type="Ionicons" name="ios-checkmark" />
                  )}
                </Button>
              </Item>

              <Item
                style={{
                  width: "100%",
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginBottom: 5,
                  marginLeft: 0
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14
                  }}
                  onChangeText={state => this.updateData("state", state)}
                  underlineColorAndroid="transparent"
                  value={this.state.authUser.state}
                  placeholder="State"
                  returnKeyType="next"
                />
              </Item>

              <Item
                style={{
                  width: "100%",
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: "white",
                  marginBottom: 5,
                  marginLeft: 0
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14
                  }}
                  onChangeText={city => this.updateData("city", city)}
                  underlineColorAndroid="transparent"
                  value={this.state.authUser.city}
                  placeholder="City"
                  returnKeyType="next"
                />
              </Item>
            </View>
          )}
        </View>
      </Container>
    );
  }

  updateData(key, value) {
    const authUser = { ...this.state.authUser, [key]: value };
    this.setState({ authUser });
  }

  async updateProfile() {
    this.setState({ loading: true });

    const { type } = this.props.navigation.state.params;
    const { mobile, name, city, state, gender } = this.state.authUser;

    this.props
      .updateUserMutation({
        variables: {
          id: this.state.authUser.id,
          mobile,
          name,
          state,
          city,
          gender
        }
      })
      .then(({ data }) => {
        type == "replace"
          ? this.props.navigation.replace("HomeScreen")
          : this.props.navigation.navigate("HomeScreen");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
}

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  },

  checkIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  }
});

export default compose(
  graphql(UPDATE_USER_MUTATION, { name: "updateUserMutation" }),
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUser" })
)(ManageProfileScreen);
