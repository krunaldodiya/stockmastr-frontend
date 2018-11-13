import React from "react";

// icons
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Zocial from "react-native-vector-icons/Zocial";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default props => {
  switch (props.type) {
    case "AntDesign":
      return (
        <AntDesign
          name={props.name}
          size={props.size}
          color={props.color}
          style={props.style}
          onPress={props.onPress}
        />
      );

    case "FontAwesome":
      return (
        <FontAwesome
          name={props.name}
          size={props.size}
          color={props.color}
          style={props.style}
          onPress={props.onPress}
        />
      );

    case "EvilIcons":
      return (
        <EvilIcons
          name={props.name}
          size={props.size}
          color={props.color}
          style={props.style}
          onPress={props.onPress}
        />
      );

    case "Feather":
      return (
        <Feather
          name={props.name}
          size={props.size}
          color={props.color}
          style={props.style}
          onPress={props.onPress}
        />
      );

    case "Entypo":
      return (
        <Entypo
          name={props.name}
          size={props.size}
          color={props.color}
          style={props.style}
          onPress={props.onPress}
        />
      );

    default:
      return (
        <FontAwesome
          name={props.name}
          size={props.size}
          color={props.color}
          style={props.style}
          onPress={props.onPress}
        />
      );
  }
};
