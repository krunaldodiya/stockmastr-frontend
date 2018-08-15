import gql from 'graphql-tag';

const CREATE_POST_MUTATION = gql`
  mutation(
    $channel_id: ID!
    $user_id: ID!
    $description: String!
    $signal: String!
    $trigger: Float!
    $stoploss: Float!
    $target: Float!
    $segment: String!
    $stock_exchange: String!
    $stock_symbol: String!
    $stock_name: String!
    $status: String!
  ) {
    createPost(
      data: {
        channel: { connect: { id: $channel_id } }
        owner: { connect: { id: $user_id } }
        description: $description
        signal: $signal
        trigger: $trigger
        stoploss: $stoploss
        target: $target
        segment: $segment
        stock_exchange: $stock_exchange
        stock_symbol: $stock_symbol
        stock_name: $stock_name
        status: $status
      }
    ) {
      id
    }
  }
`;

const TESTING = 'test';

export { CREATE_POST_MUTATION, TESTING };
