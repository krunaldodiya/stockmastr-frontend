import gql from "graphql-tag";

const PROCESS_TRANSACTION = gql`
  mutation($transaction_id: String!) {
    transaction: processTransaction(transaction_id: $transaction_id) {
      transaction_id
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
  }
`;

export { PROCESS_TRANSACTION };
