import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
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
  ListItem,
} from 'native-base';

// components
import { compose, graphql } from 'react-apollo';
import theme from '../libs/theme';

// components
import { GET_REVIEWS_QUERY } from '../graphql';
import { httpUrl } from '../libs/vars';

const moment = require('moment');

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },

  addIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },

  submitButton: {
    borderRadius: 20,
    shadowColor: '#3f2201',
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.background.primary,
  },
});

class Review extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      loading: true,
    };
  }

  async componentWillMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(props) {
    this.init(props);
  }

  async init(props) {
    const { getReviewsQuery } = props;
    this.setState({ reviews: getReviewsQuery.reviews, loading: getReviewsQuery.loading });
  }

  async showChannelReviews() {
    const review = this.data.item;

    return (
      <ListItem>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ marginRight: 7, justifyContent: 'center' }}>
              <Thumbnail
                source={{
                  uri: `${httpUrl}/images/${review.owner.avatar}`,
                }}
                small
              />
            </View>
            <View>
              <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 3 }}>
                {review.owner.name}
              </Text>
              <Text style={{ fontSize: 11, color: 'gray' }}>
                {moment(review.createdAt).format('DD-MM-YYYY hh:mm A')}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 10,
              marginLeft: 18,
              borderLeftColor: '#ccc',
              borderLeftWidth: 1,
              paddingLeft: 25,
            }}
          >
            <View style={{ marginBottom: 3 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {review.title}
              </Text>
              <Text note style={{ fontSize: 14, fontWeight: 'normal' }}>
                {review.description}
              </Text>
            </View>
          </View>
        </View>
      </ListItem>
    );
  }

  render() {
    const { navigation } = this.props;
    const { loading, reviews } = this.state;

    return (
      <Container>
        <Header style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>
Reviews & Ratings
            </Text>
          </Body>
          <Right>
            <Icon
              type="MaterialIcons"
              name="add"
              style={styles.addIcon}
              onPress={() => navigation.navigate('SubmitReviewScreen', {
                channel_id: navigation.state.params.channel_id,
              })
              }
            />
          </Right>
        </Header>

        <View style={{ flex: 1 }}>
          {loading && (
            <Spinner
              color="#000"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}

          {!loading && !reviews.length ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>
No reviews yet.
              </Text>
              <Text note>
Be first to review.
              </Text>
            </View>
          ) : (
            <FlatList
              extraData={this.state}
              data={reviews}
              renderItem={this.showChannelReviews}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </Container>
    );
  }
}

Review.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

export default compose(
  graphql(GET_REVIEWS_QUERY, {
    name: 'getReviewsQuery',
    options: ({ navigation }) => ({
      variables: {
        channel_id: navigation.state.params.channel_id,
      },
    }),
  }),
)(Review);
