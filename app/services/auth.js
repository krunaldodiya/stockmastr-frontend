import { AsyncStorage } from "react-native";

const AUTH_TOKEN_KEY = "authToken";

const setAuthToken = async value => AsyncStorage.setItem(AUTH_TOKEN_KEY, value);

const getAuthToken = async () => AsyncStorage.getItem(AUTH_TOKEN_KEY);

const resetAuthToken = async () => AsyncStorage.removeItem(AUTH_TOKEN_KEY);

export { setAuthToken, getAuthToken, resetAuthToken };
