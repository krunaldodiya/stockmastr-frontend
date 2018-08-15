import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { View, Text, Spinner } from 'native-base';

// component
import GroupChat from '../../components/Chat/GroupChat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class GroupChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channel: null,
      authUser: null,
      isSubscribed: null,
    };
  }

  componentWillMount() {
    const { navigation } = this.props;

    const isSubscribed = this.checkSubscription(
      navigation.state.params.channel_subscriptions,
      navigation.state.params.authUser,
    );

    this.setState({
      isSubscribed: !!isSubscribed,
      channel: navigation.state.params.channel,
      authUser: navigation.state.params.authUser,
    });
  }

  checkSubscription = (channelSubscriptions, authUser) => {
    const data = channelSubscriptions.filter(
      channelSubscription => channelSubscription.subscriber.id ==== authUser.id,
    );

    return data[0];
  };

  render() {
    const {
      loading, channel, isSubscribed, authUser,
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {loading && (
          <Spinner
            color="#000"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        )}

        {!loading && (
          <View style={{ flex: 1 }}>
            {channel.type === 'paid'
              && isSubscribed && <GroupChat {...this.props} channel={channel} authUser={authUser} />}

            {channel.type === 'free' && (
              <GroupChat {...this.props} channel={channel} authUser={authUser} />
            )}

            {channel.type === 'paid'
              && !isSubscribed && (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'black' }}>
Please, Subscribe to start chat.
                  </Text>
                  <Text
                    style={{ color: 'blue', marginTop: 10 }}
                    onPress={() => navigation.goBack()}
                  >
                    Go Back
                  </Text>
                </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

GroupChatScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
