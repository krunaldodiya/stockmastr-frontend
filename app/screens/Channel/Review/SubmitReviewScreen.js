import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Spinner,
  Textarea,
  Input,
  Item,
  Right
} from "native-base";

// components
import theme from "../../../libs/theme";

// components
import { compose, graphql } from "react-apollo";
import {
  GET_AUTH_USER_REVIEW_QUERY,
  CREATE_REVIEW_MUTATION,
  UPDATE_REVIEW_MUTATION,
  GET_AUTH_USERS_QUERY,
  GET_REVIEWS_QUERY
} from "../../../graphql";

class SubmitReviewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      review: {
        id: null,
        title: "",
        description: "",
        ratings: 1
      },
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
    const loading =
      props.getAuthUserReviewQuery.loading || this.props.getAuthUser.loading;

    const review = {
      ...this.state.review,
      ...props.getAuthUserReviewQuery.getAuthUserReview[0]
    };

    this.setState({ review, authUser: props.getAuthUser.user, loading });
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
            <Text style={{ color: "white" }}>Submit Review</Text>
          </Body>

          <Right>
            <Text
              style={{ color: "white", justifyContent: "center" }}
              onPress={() => this.submitReview()}
            >
              Save
            </Text>
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

          {!this.state.loading && (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 4, margin: 10 }}>
                <Item
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    borderRadius: 20,
                    borderWidth: 1,
                    backgroundColor: "white",
                    marginHorizontal: 10,
                    marginBottom: 10,
                    padding: 10
                  }}
                >
                  {[1, 2, 3, 4, 5].map(rating => {
                    const minRatings = this.state.review.ratings >= rating;

                    return (
                      <Icon
                        type="MaterialIcons"
                        name="star"
                        key={rating}
                        onPress={() => this.updateData("ratings", rating)}
                        style={{
                          fontSize: 26,
                          color: minRatings ? "#fda50f" : "#ccc"
                        }}
                      />
                    );
                  })}
                </Item>

                <Item
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    borderWidth: 1,
                    backgroundColor: "white",
                    marginBottom: 10
                  }}
                >
                  <Input
                    style={{
                      paddingLeft: 20,
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontSize: 14
                    }}
                    onChangeText={title => this.updateData("title", title)}
                    underlineColorAndroid="transparent"
                    value={this.state.review.title}
                    placeholder="title"
                    returnKeyType="next"
                  />
                </Item>

                <Item
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    borderWidth: 1,
                    backgroundColor: "white",
                    marginBottom: 10
                  }}
                >
                  <Textarea
                    style={{
                      paddingLeft: 20,
                      paddingVertical: 20,
                      fontSize: 14,
                      width: "100%"
                    }}
                    rowSpan={5}
                    onChangeText={description =>
                      this.updateData("description", description)
                    }
                    underlineColorAndroid="transparent"
                    value={this.state.review.description}
                    placeholder="Description"
                    returnKeyType="next"
                  />
                </Item>
              </View>
            </View>
          )}
        </View>
      </Container>
    );
  }

  async submitReview() {
    this.state.review.id ? this.updateReview() : this.createReview();
  }

  async createReview() {
    this.props
      .createReviewMutation({
        variables: {
          title: this.state.review.title,
          description: this.state.review.description,
          ratings: this.state.review.ratings,
          channel_id: this.props.navigation.state.params.channel_id,
          owner_id: this.state.authUser.id
        },
        refetchQueries: [
          {
            query: GET_REVIEWS_QUERY,
            variables: {
              channel_id: this.props.navigation.state.params.channel_id
            }
          }
        ]
      })
      .then(({ data }) => {
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  async updateReview() {
    this.props
      .updateReviewMutation({
        variables: {
          review_id: this.state.review.id,
          title: this.state.review.title,
          description: this.state.review.description,
          ratings: this.state.review.ratings
        },
        refetchQueries: [
          {
            query: GET_REVIEWS_QUERY,
            variables: {
              channel_id: this.props.navigation.state.params.channel_id
            }
          }
        ]
      })
      .then(({ data }) => {
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  async updateData(type, value) {
    const review = { ...this.state.review };
    review[type] = value;

    this.setState({ review });
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
  graphql(GET_AUTH_USERS_QUERY, { name: "getAuthUser" }),
  graphql(CREATE_REVIEW_MUTATION, { name: "createReviewMutation" }),
  graphql(UPDATE_REVIEW_MUTATION, { name: "updateReviewMutation" }),
  graphql(GET_AUTH_USER_REVIEW_QUERY, {
    name: "getAuthUserReviewQuery",
    options: props => {
      return {
        variables: {
          channel_id: props.navigation.state.params.channel_id
        }
      };
    }
  })
)(SubmitReviewScreen);
