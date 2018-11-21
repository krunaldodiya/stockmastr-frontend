import React from "react";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

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

const StoreProvider = props => (
  <Provider store={store}>{props.children}</Provider>
);

export { StoreProvider };
