import { AsyncStorage } from "react-native";

const TOKEN_KEY = "authToken";
const USER_ID_KEY = "authUserId";

const setAuthToken = async value => {
  return AsyncStorage.setItem(TOKEN_KEY, value);
};

const setAuthUserId = async value => {
  return AsyncStorage.setItem(USER_ID_KEY, value);
};

const getAuthToken = async () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

const getAuthUserId = async () => {
  return AsyncStorage.getItem(USER_ID_KEY);
};

const resetAuthToken = async () => {
  return AsyncStorage.removeItem(TOKEN_KEY);
};

const resetAuthUserId = async () => {
  return AsyncStorage.removeItem(USER_ID_KEY);
};

export {
  setAuthToken,
  setAuthUserId,
  getAuthToken,
  getAuthUserId,
  resetAuthToken,
  resetAuthUserId
};
