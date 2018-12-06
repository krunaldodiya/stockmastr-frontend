import { Icon, Text, View } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import theme from "../../../libs/theme";

const grids = [
  {
    id: 1,
    color: "#1DA1F2",
    title: "CALLS",
    type: "FontAwesome",
    icon: "sticky-note",
    screen: "CallsScreen"
  },
  {
    id: 2,
    color: "#feb006",
    title: "CHANNELS",
    type: "FontAwesome",
    icon: "th-list",
    screen: "ChannelsScreen"
  },
  {
    id: 3,
    color: "#9400D3",
    title: "MARKET",
    type: "FontAwesome",
    icon: "line-chart",
    screen: "MarketScreen"
  },
  {
    id: 4,
    color: "#ff6347",
    title: "FAVORITES",
    type: "FontAwesome",
    icon: "heart",
    screen: "FavoritesScreen"
  },
  {
    id: 5,
    color: "#3B5998",
    title: "TUTORIALS",
    type: "FontAwesome",
    icon: "graduation-cap",
    screen: "TutorialsScreen"
  },
  {
    id: 6,
    color: "#228B22",
    title: "SHARE",
    type: "FontAwesome",
    icon: "share",
    screen: "ShareScreen"
  }
];

const GridMenu = props => {
  const { navigation } = props;

  return (
    <View
      style={{
        flex: 4,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 5
      }}
    >
      {grids.map(grid => (
        <TouchableOpacity
          onPress={() => navigation.navigate(grid.screen)}
          key={grid.id}
          style={{
            padding: 15,
            width: "30%",
            margin: 5,
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 2,
            borderColor: "#ccc",
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 1
          }}
        >
          <Icon
            type={grid.type}
            name={grid.icon}
            style={{
              fontSize: 28,
              marginBottom: 15,
              color: grid.color
            }}
          />

          <Text
            style={{
              fontFamily: theme.fonts.TitilliumWebSemiBold,
              fontSize: 12,
              color: grid.color
            }}
          >
            {grid.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GridMenu;
