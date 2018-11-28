import Pusher from "pusher-js/react-native";
import { getAuthToken } from "../services/auth";

export default async () => {
  const authToken = await getAuthToken();

  return new Pusher("d43d6b672fb63f49b4b6", {
    cluster: "mt1",
    encrypted: true,
    auth: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken
      }
    }
  });
};
