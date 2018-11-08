import React from 'react';
import {
  View, TouchableOpacity, Text, WebView, Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../libs/api';

export default class WalletScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      order: null,
    };
  }

  createOrder = () => {
    // create order
    const order = {
      id: 5123,
      userId: 1,
      amount: 150,
      status: 'pending',
    };

    // show modal
    this.setState({ order });
  };

  handleNavigation = (state) => {
    const { url, loading, title } = state;

    if (url === api.paymentResponse && loading === false) {
      if (title === 'success') {
        this.setState({ message: 'Success' });
      }

      if (title === 'failed') {
        this.setState({ message: 'Failed' });
      }
    }
  };

  showModal = () => {
    const { order } = this.state;
    const { userId } = order;
    const url = `${api.paymentRequest}?call_id=1&user_id=${userId}`;

    return (
      <Modal visible={order} onRequestClose={() => this.setState({ order: null })}>
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={state => this.handleNavigation(state)}
        />
      </Modal>
    );
  };

  render() {
    const { message, order } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {order && this.showModal()}

        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.goBack()}>
          <Icon name="navigate-before" color="black" size={32} style={{ marginVertical: 10 }} />

          <Text style={{ marginTop: 17 }}>
WALLET
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.createOrder({ id: 1 })}>
          <Text style={{ padding: 10 }}>
ADD MONEY
          </Text>
        </TouchableOpacity>

        {message && (
        <Text>
          {message}
        </Text>
        )}
      </View>
    );
  }
}
