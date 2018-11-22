import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import { composeWithDevTools } from "redux-devtools-extension";

const saga = createSagaMiddleware();

const middlewares = [saga];

const { rootReducer } = require("./reducers");

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const { rootSaga } = require("./sagas");

saga.run(rootSaga);

export { store };
