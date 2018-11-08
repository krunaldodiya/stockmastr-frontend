import React from 'react';
import {
  View, Text, ScrollView, Image,
} from 'react-native';
import styles from '../../styles/NewsTab';
import { getNews } from '../../services/graph/get_news';
import theme from '../../libs/theme';

class NewsTab extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      news: [],
    };
  }

  async componentWillMount() {
    const { client } = this.props;

    const news = await getNews(client, {
      length: 100,
      type: 'all',
    });

    this.setState({ news, loaded: true });
  }

  render() {
    const { loaded, news } = this.state;
    const { navigation } = this.props;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>
loading
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {news.map(data => (
            <View
              style={{ backgroundColor: 'whitesmoke', margin: 5, flexDirection: 'row' }}
              key={data.id}
            >
              <View style={{ marginLeft: 5, marginRight: 10, justifyContent: 'center' }}>
                <Image source={{ uri: data.image_url }} style={{ width: 100, height: 100 }} resizeMode="cover" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebSemiBold, fontSize: 18 }}
                >
                  {data.title}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebRegular, fontSize: 14 }}
                >
                  {data.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default NewsTab;
