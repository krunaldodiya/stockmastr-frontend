import React from 'react';
import {
  View, Modal, Text, TouchableOpacity, TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../libs/theme';

export default class ShareMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shares: [
        {
          id: '1',
          name: 'Facebook',
          icon: 'facebook',
          color: '#3B5998',
        },
        {
          id: '2',
          name: 'Google',
          icon: 'google-plus',
          color: '#DB4437',
        },
        {
          id: '3',
          name: 'whatsapp',
          icon: 'whatsapp',
          color: '#25D366',
        },
        {
          id: '4',
          name: 'twitter',
          icon: 'twitter',
          color: '#1DA1F2',
        },
        {
          id: '5',
          name: 'Email',
          icon: 'envelope-o',
          color: '#000',
        },
        {
          id: '6',
          name: 'Copy Link',
          icon: 'link',
          color: '#feb006',
        },
      ],
    };
  }

  render() {
    const { shares } = this.state;
    const { visible, hideShareMenu } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => hideShareMenu()}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => hideShareMenu()} />

          <View style={{ margin: 10 }}>
            <View
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              <Text style={{ fontFamily: theme.fonts.TitilliumWebSemiBold, textAlign: 'center' }}>
                Share with
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: 'white',
                paddingBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}
            >
              {shares.map(share => (
                <TouchableOpacity
                  key={share.id}
                  style={{
                    width: '33.33%',
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name={share.icon} color={share.color} size={32} />

                  <Text style={{ marginTop: 5, fontFamily: theme.fonts.TitilliumWebRegular }}>
                    {share.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableHighlight
              onPress={() => hideShareMenu()}
              style={{
                backgroundColor: 'whitesmoke',
                padding: 12,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontFamily: theme.fonts.TitilliumWebRegular,
                  fontSize: 16,
                }}
              >
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
