import { combineReducers } from "redux";

// reducers
import home from "./home";
import auth from "./auth";
import network from "./network";

export default combineReducers({
  home,
  auth,
  network
});
