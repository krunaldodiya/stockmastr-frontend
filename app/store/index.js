import Reactotron from "reactotron-react-native";

import { applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: Reactotron.createSagaMonitor()
});

const middlewares = [sagaMiddleware];

const { rootReducer } = require("./reducers");

const store = Reactotron.createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

const { rootSaga } = require("./sagas");

sagaMiddleware.run(rootSaga);

export { store };
