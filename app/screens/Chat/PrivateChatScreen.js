import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { View } from 'native-base';

// component
import PrivateChat from '../../components/Chat/PrivateChat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class PrivateChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      guestUser: null,
    };
  }

  componentWillMount() {
    const { navigation } = this.props;

    this.setState({
      authUser: navigation.state.params.authUser,
      guestUser: navigation.state.params.guestUser,
    });
  }

  render() {
    const { guestUser, authUser } = this.state;

    return (
      <View style={styles.container}>
        <PrivateChat {...this.props} authUser={authUser} guestUser={guestUser} />
      </View>
    );
  }
}

PrivateChatScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
