import React from "react";

// redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// native base
import getTheme from "./native-base-theme/components";

// component
import InitialScreen from "./app/containers/InitialScreen";

const App = () => (
  <Provider store={store}>
    <StyleProvider style={getTheme()}>
      <InitialScreen />
    </StyleProvider>
  </Provider>
);

export default App;
