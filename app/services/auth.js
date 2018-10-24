import { AsyncStorage } from 'react-native';

const TOKEN_KEY = 'authToken';

const setAuthToken = async value => AsyncStorage.setItem(TOKEN_KEY, value);

const getAuthToken = async () => AsyncStorage.getItem(TOKEN_KEY);

const resetAuthToken = async () => AsyncStorage.removeItem(TOKEN_KEY);

export { setAuthToken, getAuthToken, resetAuthToken };
