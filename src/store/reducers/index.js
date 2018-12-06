import { combineReducers } from "redux";
import auth from "./auth";
import drawer from "./drawer";
import guest from "./guest";
import network from "./network";

const rootReducer = combineReducers({
  guest,
  auth,
  network,
  drawer
});

export { rootReducer };
