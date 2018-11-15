import { UPDATE_USER } from "./mutations/update_user";
import { setNewUser } from "../auth";
import bugsnag from "../bugsnag";

const updateUser = async (client, variables) => {
  try {
    const userData = await client.mutate({
      mutation: UPDATE_USER,
      fetchPolicy: "no-cache",
      variables
    });

    const profileUpdated = userData.data.user.profile_updated;
    await setNewUser(JSON.stringify(profileUpdated));
    return userData.data.user;
  } catch (e) {
    bugsnag.notify(e);
    throw new Error(e);
  }
};

export { updateUser };
