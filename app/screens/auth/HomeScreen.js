import React from 'react';
import {
  View, TouchableOpacity, Text, WebView,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  test = () => {
    console.log('testing');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: 'http://192.168.2.200:4000/payments/request?ORDER_ID=1' }} />

        {/* <TouchableOpacity onPress={() => this.test()}>
          <Text>
hi
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
