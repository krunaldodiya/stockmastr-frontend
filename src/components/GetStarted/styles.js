import { StyleSheet } from "react-native";
import theme from "../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d80402"
  },
  termsWrapper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  termsIcon: {
    width: 32,
    height: 32,
    marginLeft: 16
  },
  termsHeader: {
    fontWeight: "400",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "white",
    fontSize: 18
  },
  termsBody: {
    paddingHorizontal: 20
  },
  formWrapper: {
    flexDirection: "column",
    paddingVertical: 30
  },
  agreeWrapper: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
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
    backgroundColor: "#000"
  },
  submitButtonDisabled: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#ddd"
  },
  submitButtonText: {
    textAlign: "center",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "white"
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
      borderColor: agree ? "black" : "white",
      backgroundColor: agree ? "black" : "white"
    };
  }
});
