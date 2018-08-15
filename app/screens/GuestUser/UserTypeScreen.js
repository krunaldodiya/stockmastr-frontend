import React from 'react';
import { StyleSheet } from 'react-native';

import {
  View, Text, Button, Item, Icon,
} from 'native-base';

// components
import { compose, withApollo, graphql } from 'react-apollo';
import Logo from '../../components/Logo';

import { UPDATE_USER_MUTATION, GET_AUTH_USERS_QUERY } from '../../graphql';
import theme from '../../libs/theme';

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 20,
    shadowColor: '#3f2201',
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.background.primary,
  },
});

class UserTypeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      type: props.navigation.state.params.type,
    };
  }

  async updateData(key, value) {
    this.setState({ [key]: value });
  }

  async updateUserType() {
    this.setState({ loading: true });

    const { type } = this.state;
    const { updateUserMutation, getAuthUser, navigation } = this.props;

    const variables = {
      id: getAuthUser.user.id,
      type,
    };

    updateUserMutation({ variables })
      .then(() => {
        navigation.replace('ManageProfileScreen', {
          type: 'replace',
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { type, loading } = this.state;

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
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <View>
            <Item
              style={{
                borderBottomWidth: 0,
                paddingTop: 20,
                marginLeft: 10,
                marginRight: 10,
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
                  type === 'Trader' && {
                    backgroundColor: theme.background.primary,
                  },
                ]}
                onPress={() => this.updateData('type', 'Trader')}
              >
                <Text
                  style={[
                    { fontSize: 14, color: 'black' },
                    type === 'Trader' && { color: 'white' },
                  ]}
                >
                  Trader
                </Text>

                {type === 'Trader' && <Icon type="Ionicons" name="ios-checkmark" />}
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
                  type === 'Provider' && {
                    backgroundColor: theme.background.primary,
                  },
                ]}
                onPress={() => this.updateData('type', 'Provider')}
              >
                <Text
                  style={[
                    { fontSize: 14, color: 'black' },
                    type === 'Provider' && {
                      color: 'white',
                    },
                  ]}
                >
                  Provider
                </Text>

                {type === 'Provider' && <Icon type="Ionicons" name="ios-checkmark" />}
              </Button>
            </Item>

            <Item
              style={{
                marginBottom: 20,
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Button
                style={styles.submitButton}
                disabled={loading}
                onPress={() => this.updateUserType()}
              >
                <Text style={{ width: '100%', textAlign: 'center' }}>
                  {loading ? 'Please, Wait...' : 'Next'}
                </Text>
              </Button>
            </Item>
          </View>
        </View>
      </View>
    );
  }
}

export default compose(
  withApollo,
  graphql(UPDATE_USER_MUTATION, { name: 'updateUserMutation' }),
  graphql(GET_AUTH_USERS_QUERY, { name: 'getAuthUser' }),
)(UserTypeScreen);
