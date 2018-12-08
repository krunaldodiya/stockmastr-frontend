import { StyleSheet } from "react-native";
import theme from "../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  termsWrapper: {
    justifyContent: "center",
    margin: 20
  },
  termsHeader: {
    fontWeight: "400",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "black",
    fontSize: 18,
    textAlign: "center"
  },
  termsBody: {
    paddingHorizontal: 20,
  },
  formWrapper: {
    flexDirection: "column",
    paddingVertical: 30
  },
  agreeWrapper: {
    flexDirection: "row",
    borderBottomWidth: 0
  },
  agreeText: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: theme.fonts.TitilliumWebSemiBold
  },
  submitButtonWrapper: {
    marginTop: 30,
    alignSelf: "center",
    borderBottomWidth: 0
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#fff"
  },
  submitButtonDisabled: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#ddd"
  },
  submitButtonText: {
    textAlign: "center",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "red"
  },
  submitButtonTextDisabled: {
    textAlign: "center",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "#ccc"
  },
  checkBox: agree => {
    return {
      marginTop: 1,
      alignItems: "center",
      borderColor: agree ? "#ff6666" : "white",
      backgroundColor: agree ? "#ff6666" : "white"
    };
  }
});
