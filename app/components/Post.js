import React from "react";
import { TouchableOpacity } from "react-native";
import { Text, ListItem, View, Thumbnail } from "native-base";
import { httpUrl } from "../libs/vars";

const moment = require("moment");

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //
  }

  render() {
    const { post, channel } = this.props;

    return (
      <ListItem>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ChannelDetailScreen", {
                channel_id: channel.id
              })
            }
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ marginRight: 7, justifyContent: "center" }}>
                <Thumbnail
                  source={{
                    uri: `${httpUrl}/images/${channel.image}`
                  }}
                  small
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "bold", fontSize: 14, marginBottom: 3 }}
                >
                  {channel.title}
                </Text>
                <Text style={{ fontSize: 11, color: "gray" }}>
                  {moment(post.createdAt).format("DD-MM-YYYY hh:mm A")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("PostDetailScreen", {
                post_id: post.id
              })
            }
          >
            <View
              style={{
                flex: 1,
                marginTop: 10,
                marginLeft: 18,
                borderLeftColor: "#ccc",
                borderLeftWidth: 1,
                paddingLeft: 25
              }}
            >
              <Text style={{ marginBottom: 3, alignContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {post.stock_name}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "normal" }}>
                  &nbsp;({post.stock_exchange})
                </Text>
              </Text>
              <Text note style={{ color: "#333", fontSize: 12 }}>
                {post.signal.toUpperCase()}: {post.trigger} | SL:{" "}
                {post.stoploss} | TRGT: {post.target}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ListItem>
    );
  }
}
