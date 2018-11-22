import { combineReducers } from "redux";

// reducers
import home from "./home";
import auth from "./auth";
import network from "./network";

const rootReducer = combineReducers({
  home,
  auth,
  network
});

export { rootReducer };
