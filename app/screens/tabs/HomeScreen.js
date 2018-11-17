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
import styles from "../../styles/HomeScreen";
import { getNews } from "../../services/graph/get_news";

import TopBar from "../../components/TopBar";
import { FloatingAction } from "react-native-floating-action";
import IconSet from "../../libs/icon_set";

const actions = [
  {
    key: 1,
    name: "channel",
    render: () => (
      <View style={styles.actionWrapper}>
        <View style={styles.actionTextWrapper}>
          <Text style={styles.actionText}>CREATE A CHANNEL</Text>
        </View>
        <View style={styles.actionIconWrapper}>
          <IconSet
            type="FontAwesome"
            name="plus"
            size={22}
            style={styles.actionIcon}
          />
        </View>
      </View>
    )
  },
  {
    key: 2,
    name: "call",
    render: () => (
      <View style={styles.actionWrapper}>
        <View style={styles.actionTextWrapper}>
          <Text style={styles.actionText}>PLACE A CALL</Text>
        </View>
        <View style={styles.actionIconWrapper}>
          <IconSet
            type="FontAwesome"
            name="plus"
            size={22}
            style={styles.actionIcon}
          />
        </View>
      </View>
    )
  }
];

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      news: [],
      grids: [
        { id: 1, color: "#1DA1F2", title: "CALLS", icon: "sticky-note" },
        { id: 2, color: "#feb006", title: "CHANNELS", icon: "th-list" },
        { id: 3, color: "#9400D3", title: "MARKET", icon: "line-chart" },
        { id: 4, color: "#ff6347", title: "FAVORITES", icon: "heart" },
        { id: 5, color: "#3B5998", title: "TUTORIALS", icon: "graduation-cap" },
        { id: 6, color: "#228B22", title: "SHARE", icon: "share" }
      ],
      showFabMenu: false
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

    if (grid.title === "FAVORITES") {
      navigation.navigate("FavoritesScreen");
    }
  };

  render() {
    const { loaded, news, grids, showFabMenu } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <TopBar />

        <View style={{ flex: 3 }}>
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
                      numberOfLines={3}
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
            flex: 4,
            padding: 5,
            justifyContent: "center"
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {grids.map(grid => (
              <TouchableOpacity
                onPress={() => this.action(grid)}
                key={grid.id}
                style={{
                  padding: 10,
                  width: "30%",
                  margin: 5,
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "#ccc",
                  borderBottomWidth: showFabMenu ? 1 : 0,
                  elevation: showFabMenu ? 0 : 1,
                  shadowColor: "#000",
                  shadowOffset: { width: 1, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 1
                }}
              >
                <Icon
                  name={grid.icon}
                  color={grid.color}
                  size={36}
                  style={{ marginTop: 5, marginBottom: 15 }}
                />

                <Text
                  style={{
                    fontFamily: theme.fonts.TitilliumWebSemiBold,
                    fontSize: 12
                  }}
                >
                  {grid.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
          }}
        >
          <FloatingAction
            actions={actions}
            distanceToEdge={20}
            overlayColor="rgba(0,0,0,0.7)"
            onPressItem={name => {
              Alert.alert("Icon pressed", `the icon ${name} was pressed`);
            }}
            onPressMain={status => this.setState({ showFabMenu: status })}
            onPressBackdrop={() => this.setState({ showFabMenu: false })}
          />
        </View>
      </View>
    );
  }
}

export default compose(withApollo)(HomeScreen);
