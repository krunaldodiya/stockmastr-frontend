import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/NotificationsTab';

class NotificationsTab extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  render() {
    const { loaded } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>
notifications
        </Text>
      </View>
    );
  }
}

export default NotificationsTab;
