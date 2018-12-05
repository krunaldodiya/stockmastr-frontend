import { StyleSheet } from "react-native";
import theme from "../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#68b2e3"
  },
  topImageWrapper: {
    alignItems: "center",
    padding: 50,
    backgroundColor: "#006feb"
  },
  topImage: {
    width: 120,
    height: 120
  },
  formWrapper: {
    flexDirection: "column",
    margin: 30
  },
  inputGroup: errors => {
    return {
      borderColor: errors ? "#e74c3c" : "black",
      borderWidth: 1,
      borderRadius: 10
    };
  },
  inputWrapper: {
    justifyContent: "center",
    borderBottomWidth: 0
  },
  input: border => {
    return {
      fontSize: 16,
      fontFamily: theme.fonts.TitilliumWebRegular,
      borderBottomWidth: border ? 1 : 0
    };
  },
  buttonGroup: {
    marginTop: 20
  },
  submitButtonWrapper: {
    marginTop: 30,
    alignSelf: "center",
    borderBottomWidth: 0
  },
  submitButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#000"
  },
  submitButtonDisabled: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#000"
  },
  submitButtonText: {
    textAlign: "center",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "white"
  }
});
