import { combineReducers } from "redux";

// reducers
import guest from "./guest";
import auth from "./auth";
import network from "./network";

const rootReducer = combineReducers({
  guest,
  auth,
  network
});

export { rootReducer };
