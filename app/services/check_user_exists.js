import { CHECK_USER_EXISTS } from './graph/queries/check_user_exists';
import bugsnag from './bugsnag';

const checkUserExists = async (client, variables) => {
  try {
    const userData = await client.query({
      query: CHECK_USER_EXISTS,
      fetchPolicy: 'network-only',
      variables,
    });

    return userData.data.user;
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { checkUserExists };
