import { StyleSheet } from "react-native";
import theme from "../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue"
  },
  text: {
    marginLeft: 10,
    marginTop: 13,
    fontSize: 18,
    fontFamily: theme.fonts.TitilliumWebSemiBold
  }
});
