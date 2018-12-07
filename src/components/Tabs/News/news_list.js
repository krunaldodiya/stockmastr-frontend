import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

renderItem = (data, navigation) => {
  const { item } = data;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("NewsDetailScreen", { item })}
    >
      <View style={styles.newsWrapper}>
        <View style={styles.newsImageWrapper}>
          <Image
            source={{ uri: item.image_url }}
            style={styles.newsImage}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.newsTitle}>
            {item.title}
          </Text>

          <Text numberOfLines={2} style={styles.newsDescription}>
            {item.description}
          </Text>

          <Text style={styles.newsDate}>{item.published_at_readable}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

NewsList = props => {
  const { paginatedNews, loadMore, navigation } = props;

  return (
    <FlatList
      data={paginatedNews}
      keyExtractor={(_, index) => index.toString()}
      renderItem={data => this.renderItem(data, navigation)}
      onEndReached={loadMore}
    />
  );
};

export default NewsList;
