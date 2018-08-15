import gql from 'graphql-tag';

const SUBSCRIBE_TO_CHANNEL_SUBSCRIPTION = gql`
  subscription($channel_id: ID!) {
    channelSubscription(where: { mutation_in: [CREATED], node: { channel: { id: $channel_id } } }) {
      node {
        id
        createdAt
        subscriber {
          id
          name
          city
          state
        }
      }
    }
  }
`;

const UNSUBSCRIBE_FROM_CHANNEL_SUBSCRIPTION = gql`
  subscription($channel_id: ID!) {
    channelSubscription(where: { mutation_in: [DELETED], node: { channel: { id: $channel_id } } }) {
      node {
        id
      }
    }
  }
`;

const TOGGLE_CHANNEL_SUBSCRIPTION = gql`
  subscription($user_id: ID!) {
    channelSubscription(
      where: { mutation_in: [CREATED, DELETED], node: { subscriber: { id: $user_id } } }
    ) {
      node {
        id
      }
    }
  }
`;

export {
  SUBSCRIBE_TO_CHANNEL_SUBSCRIPTION,
  UNSUBSCRIBE_FROM_CHANNEL_SUBSCRIPTION,
  TOGGLE_CHANNEL_SUBSCRIPTION,
};
