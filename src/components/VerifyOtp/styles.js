import { StyleSheet } from "react-native";
import theme from "../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink"
  },
  topImageWrapper: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white"
  },
  topImage: {
    width: 180,
    height: 180
  },
  infoWrapper: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20
  },
  infoHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
    fontFamily: theme.fonts.TitilliumWebRegular
  },
  infoParagraph: {
    fontSize: 16,
    textAlign: "center",
    color: "indigo",
    marginTop: 20,
    fontFamily: theme.fonts.TitilliumWebRegular
  },
  formWrapper: {
    flexDirection: "column",
    padding: 30
  },
  inputWrapper: {
    borderBottomWidth: 0
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
  changeMobileWrapper: {
    alignSelf: "center",
    marginTop: 10
  },
  changeMobileButton: {
    borderColor: "indigo",
    borderRadius: 5
  },
  changeMobileText: {
    textAlign: "center",
    fontSize: 14,
    color: "indigo",
    fontFamily: theme.fonts.TitilliumWebRegular
  },
  timerWrapper: {
    alignSelf: "center",
    marginTop: 10
  },
  timer: {
    borderWidth: 1,
    justifyContent: "center",
    width: 40,
    height: 40,
    borderColor: "indigo",
    borderRadius: 40
  },
  timerText: {
    textAlign: "center",
    fontSize: 14,
    color: "indigo",
    fontFamily: theme.fonts.TitilliumWebSemiBold
  }
});
