import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';

// component
import InitialScreen from './app/screens/InitialScreen';

const App = () => (
  <Provider store={store}>
    <InitialScreen />
  </Provider>
);

export default App;
