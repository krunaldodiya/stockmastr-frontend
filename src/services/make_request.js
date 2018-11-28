import axios from "axios";
import { getAuthToken } from "./auth";

const makeRequest = async (url, data) => {
  const authToken = await getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authToken ? `Bearer ${authToken}` : ""
  };

  return axios.post(url, data, { headers });
};

export { makeRequest };
