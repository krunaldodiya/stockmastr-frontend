import axios from 'axios';
import { httpUrl } from '../libs/vars';
import { setAuthToken, setNewUser } from './auth';

const login = async (email) => {
  try {
    const userData = await axios.post(
      `${httpUrl}/auth/login`,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    if (userData) {
      const { token } = userData.data;
      const profileUpdated = userData.data.user.profile_updated;

      await setAuthToken(token);
      await setNewUser(JSON.stringify(profileUpdated));

      return token;
    }

    return false;
  } catch (e) {
    return false;
  }
};

export { login };
