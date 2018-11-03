import { CHECK_USER_EXISTS } from './graph/queries/check_user_exists';

const checkUserExists = async (client, variables) => {
  try {
    const userData = await client.query({
      query: CHECK_USER_EXISTS,
      fetchPolicy: 'network-only',
      variables,
    });

    return userData.data.user;
  } catch (e) {
    return false;
  }
};

export { checkUserExists };
