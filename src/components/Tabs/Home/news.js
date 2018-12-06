import { Spinner, Text, View } from "native-base";
import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import theme from "../../../libs/theme";

const NewsSlider = props => {
  const { news } = props;
  const { latest, loading, loaded } = news;

  return (
    <View style={{ flex: 3 }}>
      {loading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Spinner size="small" color="#000" />
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
          {latest.map(data => (
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
                  {data.published_at_readable}
                </Text>
              </View>
            </ImageBackground>
          ))}
        </Swiper>
      )}
    </View>
  );
};

export default NewsSlider;
