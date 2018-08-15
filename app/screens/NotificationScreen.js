import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View, Text, Container, Header, Left, Icon, Body,
} from 'native-base';

// components
import theme from '../libs/theme';

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },

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

class NotificationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;

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
Notifications
            </Text>
          </Body>
        </Header>

        <View>
          <Text>
hi
          </Text>
        </View>
      </Container>
    );
  }
}

export default NotificationScreen;
