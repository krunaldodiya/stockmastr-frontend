import { CREATE_USER } from "./mutations/create_user";
import bugsnag from "../bugsnag";

const createUser = async (client, variables) => {
  try {
    const userData = await client.mutate({
      mutation: CREATE_USER,
      fetchPolicy: "no-cache",
      variables
    });

    return userData.data.user;
  } catch (e) {
    console.log(e);

    bugsnag.notify(e);
  }
};

export { createUser };
