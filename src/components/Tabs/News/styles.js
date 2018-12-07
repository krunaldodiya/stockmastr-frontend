import { StyleSheet } from "react-native";
import theme from "../../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1
  },

  newsWrapper: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row"
  },

  newsImageWrapper: {
    marginLeft: 5,
    marginRight: 10,
    justifyContent: "center"
  },

  newsImage: {
    width: 100,
    height: 100
  },

  newsTitle: {
    margin: 5,
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    fontSize: 18
  },

  newsDescription: {
    margin: 5,
    fontFamily: theme.fonts.TitilliumWebRegular,
    fontSize: 14
  },

  newsDate: {
    margin: 5,
    fontFamily: theme.fonts.TitilliumWebLight,
    fontSize: 12
  }
});
