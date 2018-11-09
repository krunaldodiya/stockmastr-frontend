import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome";
import { compose, withApollo } from "react-apollo";
import theme from "../../libs/theme";
import styles from "../../styles/HomeTab";
import { getNews } from "../../services/graph/get_news";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      news: [],
      grids: [
        { id: 1, title: "CALLS", icon: "sticky-note" },
        { id: 2, title: "CHANNELS", icon: "th-list" },
        { id: 3, title: "MARKET", icon: "line-chart" },
        { id: 4, title: "FAVORITES", icon: "heart" },
        { id: 5, title: "TUTORIALS", icon: "graduation-cap" },
        { id: 6, title: "SHARE", icon: "share" }
      ]
    };
  }

  async componentWillMount() {
    const { client } = this.props;

    const news = await getNews(client, { skip: 0, take: 5, type: "top" });

    this.setState({ news, loaded: true });
  }

  action = grid => {
    const { navigation } = this.props;

    if (grid.title === "SHARE") {
      navigation.navigate("ShareScreen");
    }

    if (grid.title === "TUTORIALS") {
      navigation.navigate("TutorialsScreen");
    }
  };

  render() {
    const { loaded, news, grids } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ height: "40%" }}>
          {!news.length && (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )}

          {loaded && (
            <Swiper
              loadMinimal
              loadMinimalSize={1}
              loop
              dotColor="gray"
              activeDotColor="white"
              autoplay
              autoplayTimeout={3}
            >
              {news.map(data => (
                <ImageBackground
                  source={{ uri: data.image_url }}
                  resizeMode="stretch"
                  style={{ flex: 1 }}
                  key={data.id}
                >
                  <View
                    style={{
                      flex: 1,
                      padding: 10,
                      backgroundColor: "rgba(0,0,0,0.5)"
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 24,
                        fontFamily: theme.fonts.TitilliumWebSemiBold,
                        height: "60%"
                      }}
                    >
                      {data.title}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.push("NewsDetailScreen", { news: data })
                      }
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 20,
                          fontFamily: theme.fonts.TitilliumWebRegular,
                          marginTop: 15
                        }}
                      >
                        Read More
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        fontFamily: theme.fonts.TitilliumWebLight,
                        marginTop: 5
                      }}
                    >
                      {data.published_at}
                    </Text>
                  </View>
                </ImageBackground>
              ))}
            </Swiper>
          )}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {grids.map(grid => (
            <TouchableOpacity
              onPress={() => this.action(grid)}
              key={grid.id}
              style={{
                height: "50%",
                width: "33.33%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Icon
                name={grid.icon}
                color="black"
                size={42}
                style={{ marginBottom: 20 }}
              />

              <Text style={{ fontFamily: theme.fonts.TitilliumWebSemiBold }}>
                {grid.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default compose(withApollo)(HomeScreen);
