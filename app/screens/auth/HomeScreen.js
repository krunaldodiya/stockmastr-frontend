import React from 'react';
import {
  View, TouchableOpacity, Text, WebView, Modal,
} from 'react-native';

export default class HomeScreen extends React.Component {
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

    if (url === 'http://192.168.2.200:8000/payments/response' && loading === false) {
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
    const { id, userId, amount } = order;
    const url = `http://192.168.2.200:8000/payments/request?order=${id}&user=${userId}&amount=${amount}`;

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

    return (
      <View style={{ flex: 1 }}>
        {order && this.showModal()}

        <TouchableOpacity onPress={() => this.createOrder()}>
          <Text style={{ padding: 10 }}>
Pay with PayTM
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
