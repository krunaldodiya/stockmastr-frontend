import { getAuthToken, getNewUser } from './auth';
import bugsnag from './bugsnag';

const getInitialScreen = async () => {
  try {
    const authToken = await getAuthToken();
    const isNewUser = await getNewUser();

    if (!authToken) {
      return 'GetStartedScreen';
    }

    return JSON.parse(isNewUser) === 0 ? 'UserTypeScreen' : 'HomeScreen';
  } catch (e) {
    bugsnag.notify(e);
  }
};

export { getInitialScreen };
