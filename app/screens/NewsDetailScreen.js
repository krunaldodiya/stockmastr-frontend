import React from 'react';
import {
  View, TouchableOpacity, Text, Image,ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../libs/theme';

export default class NewsDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const { news } = navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.goBack()}>
          <Icon name="navigate-before" color="black" size={32} style={{ marginVertical: 10 }} />

          <Text style={{ marginTop: 17 }}>
NEWS
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Image source={{ uri: news.image_url }} style={{ width: '98%', height: 300, marginHorizontal: '1%' }} resizeMode="cover" />

              <Text style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebLight, fontSize: 12 }}>
                {news.published_at}
              </Text>

              <Text
                style={{
                  margin: 5,
                  fontFamily: theme.fonts.TitilliumWebSemiBold,
                  fontSize: 18,
                }}
              >
                {news.title}
              </Text>
              
              <Text
                style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebRegular, fontSize: 14 }}
              >
                {news.content}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
