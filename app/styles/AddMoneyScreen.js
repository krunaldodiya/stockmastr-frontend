import { StyleSheet } from "react-native";
import theme from "../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue"
  },
  submitButton: {
    backgroundColor: "#48A2F8",
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    width: 140,
    borderRadius: 10,
    marginTop: 10
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontFamily: theme.fonts.TitilliumWebBold
  },
  text: {
    marginLeft: 10,
    marginTop: 13,
    fontSize: 18,
    fontFamily: theme.fonts.TitilliumWebSemiBold
  },
  textInput: {
    justifyContent: "center",
    alignSelf: "center",
    width: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingLeft: 20
  }
});
