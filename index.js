import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Devtools
import Reactotron from "reactotron-react-native";

// make sure to execute => adb reverse tcp:9090 tcp:9090
Reactotron.configure({
  name: "React Native Demo"
})
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/
    },
    editor: false,
    errors: { veto: stackFrame => false },
    overlay: false
  })
  .connect();

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
