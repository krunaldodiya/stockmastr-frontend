import React from 'react';
import {
  View, Text, Image, TouchableOpacity, FlatList,
} from 'react-native';
import { compose, withApollo } from 'react-apollo';
import styles from '../../styles/NewsTab';
import { getNews } from '../../services/graph/get_news';
import theme from '../../libs/theme';

class NewsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      page: 0,
      refreshing: false,
      hasMore: true,
      news: [],
    };
  }

  componentWillMount() {
    this.loadNews();
  }

  showNews = (news) => {
    const { navigation } = this.props;

    return navigation.push('NewsDetailScreen', { news });
  };

  renderItem = (data) => {
    const { item } = data;

    return (
      <TouchableOpacity onPress={() => this.showNews(item)}>
        <View style={{ backgroundColor: 'whitesmoke', margin: 5, flexDirection: 'row' }}>
          <View style={{ marginLeft: 5, marginRight: 10, justifyContent: 'center' }}>
            <Image
              source={{ uri: item.image_url }}
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
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebRegular, fontSize: 14 }}
            >
              {item.description}
            </Text>

            <Text style={{ margin: 5, fontFamily: theme.fonts.TitilliumWebLight, fontSize: 12 }}>
              {item.published_at}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  loadNews = async () => {
    const { client } = this.props;
    const { news, page } = this.state;
    const skip = page * 10;

    const newsData = await getNews(client, { skip, take: 10, type: 'all' });
    const allNews = [...news, ...newsData];

    this.setState({
      news: allNews,
      refreshing: false,
      loaded: true,
      hasMore: newsData.length,
    });
  };

  loadMore = async () => {
    const { page, hasMore } = this.state;

    if (hasMore) {
      this.setState({ page: page + 1, refreshing: true }, this.loadNews);
    }
  };

  render() {
    const {
      loaded, news, refreshing, hasMore,
    } = this.state;

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
        <FlatList
          extraData={this.state}
          data={news}
          keyExtractor={(_, index) => index.toString()}
          renderItem={data => this.renderItem(data)}
          onEndReached={this.loadMore}
          onEndReachedThreshold={20}
          refreshing={refreshing}
        />

        {!hasMore && (
          <View style={{ justifyContent: 'center', padding: 10 }}>
            <Text style={{ fontFamily: theme.fonts.TitilliumWebRegular }}>
No more data
            </Text>
          </View>
        )}
      </View>
    );
  }
}

export default compose(withApollo)(NewsScreen);
