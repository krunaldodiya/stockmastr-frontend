import { graph } from "./api/graph";
import { api } from "../libs/api";

const getInitialScreen = async () => {
  try {
    const authUser = await graph(api.me, {});
    return authUser.profile_updated ? "TabScreen" : "GetStartedScreen";
  } catch (error) {
    return "GetStartedScreen";
  }
};

export { getInitialScreen };
