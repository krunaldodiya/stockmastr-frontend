import { StyleSheet } from "react-native";
import theme from "../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5"
  },
  termsWrapper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
    backgroundColor: "#d80402"
  },
  termsIcon: {
    color: "white"
  },
  termsHeader: {
    fontWeight: "400",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "white",
    fontSize: 18
  },
  termsBody: {
    margin: 3
  },
});
