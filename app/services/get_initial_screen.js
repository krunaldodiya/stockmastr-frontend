import { getAuthToken, getNewUser } from './auth';

const getInitialScreen = async () => {
  try {
    const authToken = await getAuthToken();
    const isNewUser = await getNewUser();

    if (!authToken) {
      return 'GetStartedScreen';
    }

    return JSON.parse(isNewUser) === 0 ? 'UserTypeScreen' : 'HomeScreen';
  } catch (e) {
    return false;
  }
};

export { getInitialScreen };
