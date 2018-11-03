import axios from 'axios';
import { httpUrl } from '../libs/vars';
import { setAuthToken } from './auth';

const login = async (client, variables) => {
  try {
    const { data } = await axios.post(
      `${httpUrl}/auth/login`,
      {
        email: variables.email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    setAuthToken(data.token);
    return true;
  } catch (e) {
    return false;
  }
};

export { login };
