import { StyleSheet } from "react-native";
import theme from "../../../libs/theme";

export default StyleSheet.create({
    container: {
        flex: 1
      },
    
      actionWrapper: {
        flexDirection: "row"
      },
    
      actionTextWrapper: {
        paddingLeft: 20,
        paddingRight: 10,
        marginRight: 20,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: "white",
        justifyContent: "center"
      },
    
      actionText: {
        color: "black",
        fontSize: 14,
        fontFamily: theme.fonts.TitilliumWebSemiBold
      },
      actionIconWrapper: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 50
      },
      actionIcon: {
        color: "black",
        textAlign: "center"
      }
});
