import { combineReducers } from "redux";

// reducers
import homeReducer from "./home";
import networkReducer from "./network";

export default combineReducers({
  home: homeReducer,
  network: networkReducer
});
