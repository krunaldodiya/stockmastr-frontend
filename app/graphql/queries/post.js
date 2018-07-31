import gql from "graphql-tag";

const GET_POST_BY_ID = gql`
  query($post_id: ID!) {
    post(where: { id: $post_id }) {
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
      updatedAt
      channel {
        id
        title
        image
        description
        type
        channel_subscriptions {
          id
          subscriber {
            id
            name
            city
            state
          }
          createdAt
          updatedAt
        }
      }
      owner {
        id
        name
        city
        state
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_AUTH_USERS_POST_QUERY = gql`
  query {
    getAuthUserPosts(orderBy: createdAt_DESC, skip: 50) {
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
      updatedAt
      channel {
        id
        title
        image
      }
    }
  }
`;

const GET_USERS_POST_QUERY = gql`
  query($subscriptions: [ID!]) {
    posts(where: { channel: { id_in: $subscriptions } }) {
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
      updatedAt
      channel {
        id
        title
        image
      }
    }
  }
`;

export { GET_POST_BY_ID, GET_USERS_POST_QUERY, GET_AUTH_USERS_POST_QUERY };
