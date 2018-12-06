import { combineReducers } from "redux";
import auth from "./auth";
import drawer from "./drawer";
import guest from "./guest";
import network from "./network";
import news from "./news";

const rootReducer = combineReducers({
  guest,
  auth,
  network,
  drawer,
  news
});

export { rootReducer };

