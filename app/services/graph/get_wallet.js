import { GET_WALLET } from "./queries/get_wallet";
import bugsnag from "../bugsnag";

const getWallet = async (client, variables) => {
  try {
    const walletData = await client.query({
      query: GET_WALLET,
      fetchPolicy: "network-only",
      variables
    });

    return walletData.data.wallet;
  } catch (e) {
    console.log(e);

    bugsnag.notify(e);
  }
};

export { getWallet };
