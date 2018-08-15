import gql from 'graphql-tag';

const CREATE_CHANNEL_MUTATION = gql`
  mutation(
    $title: String!
    $description: String!
    $segment: String!
    $type: String!
    $accuracy: Float!
    $minimum_calls: Int!
    $trial_days: Int!
    $charge: Int!
    $owner_id: ID!
  ) {
    createChannel(
      data: {
        title: $title
        description: $description
        segment: $segment
        type: $type
        accuracy: $accuracy
        minimum_calls: $minimum_calls
        trial_days: $trial_days
        charge: $charge
        owner: { connect: { id: $owner_id } }
      }
    ) {
      id
    }
  }
`;

const CREATE_CHANNEL_SUBSCRIPTION_MUTATION = gql`
  mutation($channel_id: ID!, $subscriber_id: ID!, $status: String!) {
    createChannelSubscription(
      data: {
        channel: { connect: { id: $channel_id } }
        subscriber: { connect: { id: $subscriber_id } }
        status: $status
      }
    ) {
      id
      channel {
        id
      }
      subscriber {
        id
      }
      status
    }
  }
`;

const SUBSCRIBE_TO_CHANNEL_MUTATION = gql`
  mutation($channel_id: ID!, $subscriber_id: ID!, $status: String!) {
    createChannelSubscription(
      data: {
        channel: { connect: { id: $channel_id } }
        subscriber: { connect: { id: $subscriber_id } }
        status: $status
      }
    ) {
      id
    }
  }
`;

const UNSUBSCRIBE_FROM_CHANNEL_MUTATION = gql`
  mutation($subscription_id: ID!) {
    deleteChannelSubscription(where: { id: $subscription_id }) {
      id
    }
  }
`;

const UPLOAD_CHANNEL_PICTURE_MUTATION = gql`
  mutation($channel_id: ID!, $image: Upload!) {
    uploadChannelPicture(image: $image, channel_id: $channel_id) {
      id
    }
  }
`;

const CREATE_REVIEW_MUTATION = gql`
  mutation(
    $title: String!
    $description: String!
    $ratings: Float!
    $channel_id: ID!
    $owner_id: ID!
  ) {
    createReview(
      data: {
        title: $title
        description: $description
        ratings: $ratings
        channel: { connect: { id: $channel_id } }
        owner: { connect: { id: $owner_id } }
      }
    ) {
      id
      title
      description
      ratings
    }
  }
`;

const UPDATE_REVIEW_MUTATION = gql`
  mutation($review_id: ID!, $title: String!, $description: String!, $ratings: Float!) {
    updateReview(
      where: { id: $review_id }
      data: { title: $title, description: $description, ratings: $ratings }
    ) {
      id
      title
      description
      ratings
    }
  }
`;

export {
  CREATE_CHANNEL_MUTATION,
  CREATE_CHANNEL_SUBSCRIPTION_MUTATION,
  SUBSCRIBE_TO_CHANNEL_MUTATION,
  UNSUBSCRIBE_FROM_CHANNEL_MUTATION,
  UPLOAD_CHANNEL_PICTURE_MUTATION,
  CREATE_REVIEW_MUTATION,
  UPDATE_REVIEW_MUTATION,
};
