import React from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Right,
  Spinner,
  Thumbnail,
  ListItem
} from "native-base";

// components
import theme from "../../../libs/theme";

// components
import { compose, graphql } from "react-apollo";
import { GET_REVIEWS_QUERY } from "../../../graphql";
import {httpUrl} from "../../../libs/vars";

const moment = require("moment");

class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      reviews: [],
      loading: true
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const loading = props.getReviewsQuery.loading;

    this.setState({ reviews: props.getReviewsQuery.reviews, loading });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ color: "white" }}>Reviews & Ratings</Text>
          </Body>
          <Right>
            <Icon
              type="MaterialIcons"
              name="add"
              style={styles.addIcon}
              onPress={() =>
                this.props.navigation.navigate("SubmitReviewScreen", {
                  channel_id: this.props.navigation.state.params.channel_id
                })
              }
            />
          </Right>
        </Header>

        <View style={{ flex: 1 }}>
          {this.state.loading && (
            <Spinner
              color="#000"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          )}

          {!this.state.loading && !this.state.reviews.length ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>No reviews yet.</Text>
              <Text note>Be first to review.</Text>
            </View>
          ) : (
            <FlatList
              extraData={this.state}
              data={this.state.reviews}
              renderItem={data => this.showChannelReviews(data)}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </Container>
    );
  }

  showChannelReviews(data) {
    const review = data.item;

    return (
      <ListItem>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ marginRight: 7, justifyContent: "center" }}>
              <Thumbnail
                source={{
                  uri: `${httpUrl}/images/${review.owner.avatar}`
                }}
                small
              />
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{ fontWeight: "bold", fontSize: 14, marginBottom: 3 }}
              >
                {review.owner.name}
              </Text>
              <Text style={{ fontSize: 11, color: "gray" }}>
                {moment(review.createdAt).format("DD-MM-YYYY hh:mm A")}
              </Text>
            </View>
          </View>

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
            <View style={{ marginBottom: 3 }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                {review.title}
              </Text>
              <Text note style={{ fontSize: 14, fontWeight: "normal" }}>
                {review.description}
              </Text>
            </View>
          </View>
        </View>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  },

  addIcon: {
    padding: 10,
    color: "white",
    fontSize: 26
  },

  submitButton: {
    borderRadius: 20,
    shadowColor: "#3f2201",
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.background.primary
  }
});

export default compose(
  graphql(GET_REVIEWS_QUERY, {
    name: "getReviewsQuery",
    options: props => {
      return {
        variables: {
          channel_id: props.navigation.state.params.channel_id
        }
      };
    }
  })
)(ReviewScreen);
