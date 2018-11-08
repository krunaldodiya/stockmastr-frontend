import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShareMenu from '../components/ShareMenu';

export default class WalletScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  hideShareMenu = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.goBack()}>
          <Icon name="navigate-before" color="black" size={32} style={{ marginVertical: 10 }} />

          <Text style={{ marginTop: 17 }}>
Share & Rate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
          <Text style={{ padding: 10 }}>
Share the app
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
          <Text style={{ padding: 10 }}>
Rate the app
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ visible: true })}>
          <Text style={{ padding: 10 }}>
Like us on facebook
          </Text>
        </TouchableOpacity>

        <ShareMenu visible={visible} hideShareMenu={this.hideShareMenu} />
      </View>
    );
  }
}
