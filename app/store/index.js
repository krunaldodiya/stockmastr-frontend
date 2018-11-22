import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

const saga = createSagaMiddleware();

const middlewares = [saga];

const { rootReducer } = require("./reducers");

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const { rootSaga } = require("./sagas");

saga.run(rootSaga);

export { store };
