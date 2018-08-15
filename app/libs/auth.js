import { AsyncStorage } from 'react-native';

const TOKEN_KEY = 'authToken';
const USER_ID_KEY = 'authUserId';

const setAuthToken = async value => AsyncStorage.setItem(TOKEN_KEY, value);

const setAuthUserId = async value => AsyncStorage.setItem(USER_ID_KEY, value);

const getAuthToken = async () => AsyncStorage.getItem(TOKEN_KEY);

const getAuthUserId = async () => AsyncStorage.getItem(USER_ID_KEY);

const resetAuthToken = async () => AsyncStorage.removeItem(TOKEN_KEY);

const resetAuthUserId = async () => AsyncStorage.removeItem(USER_ID_KEY);

export {
  setAuthToken,
  setAuthUserId,
  getAuthToken,
  getAuthUserId,
  resetAuthToken,
  resetAuthUserId,
};
