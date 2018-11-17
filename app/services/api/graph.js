import axios from "axios";
import { getAuthToken } from "../auth";
import bugsnag from "../bugsnag";

const graph = async (url, data) => {
  const authToken = await getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authToken ? `Bearer ${authToken}` : ""
  };

  return new Promise((resolve, reject) => {
    return axios
      .post(url, data, { headers })
      .then(response => resolve(response.data))
      .catch(({ response }) => {
        const error = response.data;
        __DEV__ ? console.log({ error }) : bugsnag.notify({ error });

        reject({ error });
      });
  });
};

export { graph };
