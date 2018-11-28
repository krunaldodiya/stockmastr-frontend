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
    backgroundColor: "#006feb",    
  },
  topImage: {
    width: 120,
    height: 120
  },
  infoWrapper: {
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
  },
  infoHeading: {
    fontSize: 26,
    textAlign: "center",
    color: "#ffffff",
    fontFamily: theme.fonts.TitilliumWebSemiBold
  },
  infoParagraph: {
    fontSize: 18,
    textAlign: "center",
    color: "#ffffff",
    marginHorizontal: 20,
    marginTop: 30,
    fontFamily: theme.fonts.TitilliumWebSemiBold
  },
  formWrapper: {
    flexDirection: "column",
    padding: 30,
  },
  inputWrapper: {
    borderBottomWidth: 0,
  },
  input: errors => {
    return {
      borderColor: errors ? "#e74c3c" : "black",
      marginHorizontal: 20,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 20,
      fontFamily: theme.fonts.TitilliumWebRegular
    };
  },
  submitButtonWrapper: {
    marginTop: 40,
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
