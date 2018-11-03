import axios from 'axios';
import { getAuthToken } from './auth';
import { httpUrl } from '../libs/vars';

const getInitialScreen = async () => {
  try {
    const authToken = await getAuthToken();
    if (!authToken) {
      return 'GetStartedScreen';
    }

    const { data } = await axios.post(
      `${httpUrl}/api/me`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    return data.type_selected ? 'HomeScreen' : 'UserTypeScreen';
  } catch (e) {
    return false;
  }
};

export { getInitialScreen };
