import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import styles from "../../styles/NewsTab";
import { graph } from "../../services";
import theme from "../../libs/theme";
import TopBar from "../../components/TopBar";
import { api } from "../../libs/api";

class NewsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      refreshing: false,
      newsList: [],
      page: 1,
      limit: 20,
      lastPage: null
    };
  }

  componentWillMount() {
    this.loadNews();
  }

  showNews = news => {
    const { navigation } = this.props;

    return navigation.push("NewsDetailScreen", { news });
  };

  loadNews = async () => {
    const { newsList, limit, page } = this.state;

    const { news } = await graph(api.allNews, { limit, page });
    const allNews = [...newsList, ...news.data];

    this.setState({
      loaded: true,
      refreshing: false,
      newsList: allNews,
      lastPage: news.last_page
    });
  };

  loadMore = async () => {
    const { page, lastPage } = this.state;

    if (lastPage > page) {
      this.setState({ page: page + 1, refreshing: true }, this.loadNews);
    }
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.showNews(item)}>
      <View
        style={{
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          flexDirection: "row"
        }}
      >
        <View
          style={{ marginLeft: 5, marginRight: 10, justifyContent: "center" }}
        >
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
              fontSize: 18
            }}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              margin: 5,
              fontFamily: theme.fonts.TitilliumWebRegular,
              fontSize: 14
            }}
          >
            {item.description}
          </Text>

          <Text
            style={{
              margin: 5,
              fontFamily: theme.fonts.TitilliumWebLight,
              fontSize: 12
            }}
          >
            {item.published_at}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { loaded, newsList, refreshing, page, lastPage } = this.state;

    return (
      <View style={styles.container}>
        <TopBar />

        {!loaded && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="small" color="#000" />
          </View>
        )}

        {loaded && (
          <FlatList
            extraData={this.state}
            data={newsList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={data => this.renderItem(data)}
            onEndReached={this.loadMore}
            onEndReachedThreshold={20}
            refreshing={refreshing}
            ListFooterComponent={() => {
              if (!refreshing && page === lastPage) {
                return (
                  <View style={{ justifyContent: "center", padding: 10 }}>
                    <Text
                      style={{ fontFamily: theme.fonts.TitilliumWebRegular }}
                    >
                      No more data
                    </Text>
                  </View>
                );
              }

              return (
                <View style={{ justifyContent: "center", padding: 10 }}>
                  <Text style={{ fontFamily: theme.fonts.TitilliumWebRegular }}>
                    Loading...
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    );
  }
}

export default NewsScreen;
