import { CREATE_USER } from './graph/mutations/create_user';

const createUser = async (client, variables) => {
  try {
    const userData = await client.mutate({
      mutation: CREATE_USER,
      fetchPolicy: 'no-cache',
      variables,
    });

    return userData.data.user;
  } catch (e) {
    return false;
  }
};

export { createUser };
