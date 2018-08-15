import React from 'react';
import { StyleSheet } from 'react-native';

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
  Spinner,
} from 'native-base';

// components
import { compose, graphql } from 'react-apollo';
import { UPDATE_USER_MUTATION, GET_AUTH_USERS_QUERY } from '../../graphql';

// libs
import theme from '../../libs/theme';

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },

  checkIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },
});

class ManageProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      loading: true,
    };
  }

  async componentWillMount() {
    const { getAuthUser } = this.props;
    this.setState({ authUser: getAuthUser.user, loading: false });
  }

  updateData(key, value) {
    const { authUser } = this.state;
    this.setState({ authUser: { ...authUser, [key]: value } });
  }

  async updateProfile() {
    this.setState({ loading: true });

    const { authUser } = this.state;
    const { navigation, updateUserMutation } = this.props;
    const { type } = navigation.state.params;
    const {
      mobile, name, city, state, gender,
    } = authUser;

    updateUserMutation({
      variables: {
        id: authUser.id,
        mobile,
        name,
        state,
        city,
        gender,
      },
    })
      .then(
        () => (type === 'replace' ? navigation.replace('HomeScreen') : navigation.navigate('HomeScreen')),
      )
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { navigation } = this.props;
    const { loading, authUser } = this.state;

    return (
      <Container>
        <Header style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>
CREATE PROFILE
            </Text>
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
            padding: 10,
          }}
        >
          {loading && (
            <Spinner
              color="#000"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}

          {!loading && (
            <View>
              <Item
                style={{
                  width: '100%',
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  marginBottom: 5,
                  marginLeft: 0,
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14,
                  }}
                  onChangeText={name => this.updateData('name', name)}
                  underlineColorAndroid="transparent"
                  value={authUser.name}
                  placeholder="Full Name"
                  returnKeyType="next"
                />
              </Item>

              <Item
                style={{
                  width: '100%',
                  borderBottomWidth: 0,
                  marginBottom: 5,
                  marginLeft: 0,
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
                      backgroundColor: 'white',
                    },
                    authUser.gender === 'Male' && {
                      backgroundColor: theme.background.primary,
                    },
                  ]}
                  onPress={() => this.updateData('gender', 'Male')}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: 'black' },
                      authUser.gender === 'Male' && { color: 'white' },
                    ]}
                  >
                    Male
                  </Text>

                  {authUser.gender === 'Male' && <Icon type="Ionicons" name="ios-checkmark" />}
                </Button>
                <Button
                  style={[
                    {
                      flex: 1,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      backgroundColor: 'white',
                    },
                    authUser.gender === 'Female' && {
                      backgroundColor: theme.background.primary,
                    },
                  ]}
                  onPress={() => this.updateData('gender', 'Female')}
                >
                  <Text
                    style={[
                      { fontSize: 14, color: 'black' },
                      authUser.gender === 'Female' && {
                        color: 'white',
                      },
                    ]}
                  >
                    Female
                  </Text>

                  {authUser.gender === 'Female' && <Icon type="Ionicons" name="ios-checkmark" />}
                </Button>
              </Item>

              <Item
                style={{
                  width: '100%',
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  marginBottom: 5,
                  marginLeft: 0,
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14,
                  }}
                  onChangeText={state => this.updateData('state', state)}
                  underlineColorAndroid="transparent"
                  value={authUser.state}
                  placeholder="State"
                  returnKeyType="next"
                />
              </Item>

              <Item
                style={{
                  width: '100%',
                  borderRadius: 50,
                  borderWidth: 1,
                  backgroundColor: 'white',
                  marginBottom: 5,
                  marginLeft: 0,
                }}
              >
                <Input
                  style={{
                    paddingLeft: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    fontSize: 14,
                  }}
                  onChangeText={city => this.updateData('city', city)}
                  underlineColorAndroid="transparent"
                  value={authUser.city}
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
}

export default compose(
  graphql(UPDATE_USER_MUTATION, { name: 'updateUserMutation' }),
  graphql(GET_AUTH_USERS_QUERY, { name: 'getAuthUser' }),
)(ManageProfileScreen);
