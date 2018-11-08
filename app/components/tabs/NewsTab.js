import React from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity,
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

  showNews = (news) => {
    const { navigation } = this.props;

    return navigation.push('NewsDetailScreen', { news });
  };

  render() {
    const { loaded, news } = this.state;

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
            <TouchableOpacity key={data.id} onPress={() => this.showNews(data)}>
              <View style={{ backgroundColor: 'whitesmoke', margin: 5, flexDirection: 'row' }}>
                <View style={{ marginLeft: 5, marginRight: 10, justifyContent: 'center' }}>
                  <Image
                    source={{ uri: data.image_url }}
                    style={{ width: 100, height: 100 }}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      margin: 5,
                      fontFamily: theme.fonts.TitilliumWebSemiBold,
                      fontSize: 18,
                    }}
                  >
                    {data.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebRegular, fontSize: 14 }}
                  >
                    {data.description}
                  </Text>

                  <Text
                    style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebLight, fontSize: 12 }}
                  >
                    {data.published_at}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default NewsTab;
