import { StyleSheet } from "react-native";
import theme from "../../libs/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink"
  },
  topImageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "white"
  },
  topImage: {
    width: 180,
    height: 180
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 30
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
    flex: 1,
    flexDirection: "column",
    padding: 30,
    justifyContent: "space-around"
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
    alignSelf: "center"
  },
  changeMobileButton: {
    borderColor: "indigo",
    borderRadius: 5
  },
  changeMobileText: {
    textAlign: "center",
    fontSize: 12,
    color: "indigo",
    fontFamily: theme.fonts.TitilliumWebRegular
  },
  timerWrapper: {
    alignSelf: "center"
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
