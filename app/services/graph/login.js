import { LOGIN } from './mutations/login';
import { setAuthToken, setNewUser } from '../auth';
import bugsnag from '../bugsnag';

const login = async (client, variables) => {
  try {
    const userData = await client.mutate({
      mutation: LOGIN,
      fetchPolicy: 'no-cache',
      variables,
    });

    if (userData) {
      const { token, user } = userData.data.auth;

      await setAuthToken(token);
      await setNewUser(JSON.stringify(user.profile_updated));

      return token;
    }

    return false;
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { login };
