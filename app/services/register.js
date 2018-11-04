import { CREATE_USER } from './graph/mutations/create_user';

const register = async (client, variables) => {
  try {
    const userData = await client.mutate({
      mutation: CREATE_USER,
      fetchPolicy: 'no-cache',
      variables,
    });

    return !!userData;
  } catch (e) {
    return false;
  }
};

export { register };
