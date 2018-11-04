import { AsyncStorage } from 'react-native';

const AUTH_TOKEN_KEY = 'authToken';

const NEW_USER_KEY = 'newUser';

const setAuthToken = async value => AsyncStorage.setItem(AUTH_TOKEN_KEY, value);

const getAuthToken = async () => AsyncStorage.getItem(AUTH_TOKEN_KEY);

const resetAuthToken = async () => AsyncStorage.removeItem(AUTH_TOKEN_KEY);

const setNewUser = async value => AsyncStorage.setItem(NEW_USER_KEY, value);

const getNewUser = async () => AsyncStorage.getItem(NEW_USER_KEY);

const resetNewUser = async () => AsyncStorage.removeItem(NEW_USER_KEY);

export {
  setAuthToken, getAuthToken, resetAuthToken, setNewUser, getNewUser, resetNewUser,
};
