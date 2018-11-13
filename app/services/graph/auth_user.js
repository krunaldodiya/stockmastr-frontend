import { AUTH_USER } from "./queries/auth_user";
import bugsnag from "../bugsnag";

const authUser = async (client, variables) => {
  try {
    const userData = await client.query({
      query: AUTH_USER,
      fetchPolicy: "network-only",
      variables
    });

    return userData.data.me;
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { authUser };
