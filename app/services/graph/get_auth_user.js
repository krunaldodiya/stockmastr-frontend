import { GET_AUTH_USER } from "./queries/get_auth_user";
import bugsnag from "../bugsnag";

const getAuthUser = async (client, variables) => {
  try {
    const userData = await client.query({
      query: GET_AUTH_USER,
      fetchPolicy: "network-only",
      variables
    });

    return userData.data.authUser;
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { getAuthUser };
