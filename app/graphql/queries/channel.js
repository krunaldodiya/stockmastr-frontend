import gql from "graphql-tag";

const GET_CHANNEL_BY_ID = gql`
  query($channel_id: ID!) {
    channel(where: { id: $channel_id }) {
      id
      title
      description
      type
      segment
      image
      owner {
        id
        name
        city
        state
        avatar
      }
      posts {
        id
        description
        stock_name
        stock_symbol
        stock_exchange
        signal
        trigger
        stoploss
        target
        createdAt
      }
      createdAt
    }
  }
`;

const GET_CHANNEL_SUBSCRIPTIONS_QUERY = gql`
  query($channel_id: ID!) {
    getChannelSubscriptions(where: { channel: { id: $channel_id } }) {
      id
      subscriber {
        id
        name
        city
        state
        avatar
      }
      createdAt
    }
  }
`;

const GET_GUEST_USER_SUBSCRIPTIONS_QUERY = gql`
  query($subscriber_id: ID!) {
    getGuestUserSubscriptions(where: { subscriber: { id: $subscriber_id } }) {
      id
      channel {
        id
        title
        description
        type
        segment
        image
        owner {
          id
          name
          city
          state
          avatar
        }
        createdAt
      }
      createdAt
    }
  }
`;

const GET_AUTH_USER_SUBSCRIPTIONS_QUERY = gql`
  query {
    getAuthUserSubscriptions {
      id
      channel {
        id
        title
        description
        type
        segment
        image
        owner {
          id
          name
          city
          state
          avatar
        }
        createdAt
      }
      createdAt
    }
  }
`;

const GET_AUTH_USER_CHANNELS_QUERY = gql`
  query($user_id: ID!) {
    channels(where: { owner: { id: $user_id } }) {
      id
      title
      description
      type
      segment
      image
      createdAt
    }
  }
`;

const GET_REVIEWS_QUERY = gql`
  query($channel_id: ID!) {
    reviews(where: { channel: { id: $channel_id } }) {
      id
      title
      description
      ratings
      owner {
        name
        avatar
      }
    }
  }
`;

const GET_AUTH_USER_REVIEW_QUERY = gql`
  query($channel_id: ID!) {
    getAuthUserReview(channel_id: $channel_id) {
      id
      title
      description
      ratings
    }
  }
`;

const SEARCH_CHANNEL_QUERY = gql`
  query($keywords: String!) {
    channels(
      where: {
        OR: [{ title_contains: $keywords }, { description_contains: $keywords }]
      }
    ) {
      id
      title
      description
      type
      segment
      image
      owner {
        id
        name
        city
        state
        avatar
      }
      createdAt
    }
  }
`;

export {
  GET_CHANNEL_BY_ID,
  GET_CHANNEL_SUBSCRIPTIONS_QUERY,
  GET_GUEST_USER_SUBSCRIPTIONS_QUERY,
  GET_AUTH_USER_SUBSCRIPTIONS_QUERY,
  GET_AUTH_USER_CHANNELS_QUERY,
  GET_REVIEWS_QUERY,
  GET_AUTH_USER_REVIEW_QUERY,
  SEARCH_CHANNEL_QUERY
};
