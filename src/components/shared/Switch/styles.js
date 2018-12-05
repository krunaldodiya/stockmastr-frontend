import { StyleSheet } from "react-native";
import theme from "../../../libs/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 150,
    marginTop: 10,
  },
  switchOptionWrapper: (option, selected, index) => {    
    return {
      flex: 1,
      backgroundColor: option === selected ? "black" : "white",
      borderTopLeftRadius: index === 0 ? 20 : 0,
      borderBottomLeftRadius: index === 0 ? 20 : 0,
      borderTopRightRadius: index === 1 ? 20 : 0,
      borderBottomRightRadius: index === 1 ? 20 : 0,
      padding: 7
    };
  },
  switchOptionText: (option, selected) => {
    return {
      color: option === selected ? "white" : "black",
      fontSize: 14,
      textAlign: "center",
      fontFamily: theme.fonts.TitilliumWebRegular,
    };
  }
});
