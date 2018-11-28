import React from "react";
import { Provider } from "react-redux";
import MainScreen from "./src/containers/MainScreen";
import { store } from "./src/store";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}

export default App;
