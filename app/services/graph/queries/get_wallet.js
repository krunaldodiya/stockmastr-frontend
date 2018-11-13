import gql from "graphql-tag";

const GET_WALLET = gql`
  query {
    wallet {
      balance
      transactions {
        amount
        transaction_id
        transaction_type
        status
        meta
        created_at
        updated_at
      }
    }
  }
`;

export { GET_WALLET };
