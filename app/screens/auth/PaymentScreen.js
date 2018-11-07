import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: null,
    };
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.push('WalletScreen')}>
          <Text>
Show Wallet
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
