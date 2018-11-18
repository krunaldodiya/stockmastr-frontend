import { graph } from "./api/graph";
import { api } from "../libs/api";

const getInitialScreen = async () => {
  try {
    const { user } = await graph(api.me, {});
    return user.profile_updated ? "TabScreen" : "GetStartedScreen";
  } catch (error) {
    return "GetStartedScreen";
  }
};

export { getInitialScreen };
