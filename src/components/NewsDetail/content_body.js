import { Content, Text } from "native-base";
import React from "react";
import { Image, Linking, TouchableOpacity } from "react-native";
import theme from "../../libs/theme";
import styles from "./styles";

const ContentBody = props => {
  const { news } = props.navigation.state.params;

  return (
    <Content style={styles.termsBody}>
      <Image
        source={{ uri: news.image_url }}
        style={{
          width: "100%",
          height: 300,
          justifyContent: "center",
          alignSelf: "center"
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          marginVertical: 10,
          marginHorizontal: 5,
          fontFamily: theme.fonts.TitilliumWebLight,
          fontSize: 12
        }}
      >
        {news.published_at}
      </Text>

      <Text
        style={{
          marginHorizontal: 5,
          fontFamily: theme.fonts.TitilliumWebSemiBold,
          fontSize: 18
        }}
      >
        {news.title}
      </Text>

      <Text
        style={{
          margin: 5,
          fontFamily: theme.fonts.TitilliumWebRegular,
          fontSize: 14
        }}
      >
        {news.content}
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL(news.source_url)}>
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 5,
            fontFamily: theme.fonts.TitilliumWebSemiBold,
            fontSize: 14,
            color: "indigo"
          }}
        >
          READ FULL ARTICLE
        </Text>
      </TouchableOpacity>
    </Content>
  );
};

export default ContentBody;
