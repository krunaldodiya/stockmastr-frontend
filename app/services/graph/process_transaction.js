import { PROCESS_TRANSACTION } from "./mutations/process_transaction";
import bugsnag from "../bugsnag";

const processTransaction = async (client, variables) => {
  try {
    const transactionData = await client.mutate({
      mutation: PROCESS_TRANSACTION,
      fetchPolicy: "no-cache",
      variables
    });

    return transactionData.data.transaction;
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { processTransaction };
