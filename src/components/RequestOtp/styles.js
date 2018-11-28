import { StyleSheet } from "react-native";
import theme from "../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#68b2e3"
  },
  submitButtonWrapper: {
    justifyContent: "flex-end",
    alignSelf: "center",
    marginTop: 50
  },
  submitButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#000"
  },
  submitButtonText: {
    textAlign: "center",
    fontFamily: theme.fonts.TitilliumWebSemiBold,
    color: "white"
  },
  topImageWrapper: {
    alignItems: "center",
    marginTop: 50
  },
  topImage: {
    width: 130,
    height: 130
  },
  infoWrapper: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 30
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
    marginTop: 50
  },
  inputWrapper: {},
  input: errors => {
    return {
      borderColor: errors ? "#e74c3c" : "black",
      marginHorizontal: 30,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 20,
      fontFamily: theme.fonts.TitilliumWebRegular
    };
  }
});
