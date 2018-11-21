// Redux
import { createStore, applyMiddleware } from "redux";

// Reducer
import rootReducer from "./reducers";

// middlewares
import middlewares from "./middlewares";

// initial state
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

export { store };
