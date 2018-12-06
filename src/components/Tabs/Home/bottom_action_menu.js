import { View, Text, Icon } from "native-base";
import React from "react";
import { FloatingAction } from "react-native-floating-action";
import styles from "./styles";

const actions = [
  {
    key: 1,
    name: "channel",
    render: () => (
      <View style={styles.actionWrapper}>
        <View style={styles.actionTextWrapper}>
          <Text style={styles.actionText}>CREATE A CHANNEL</Text>
        </View>
        <View style={styles.actionIconWrapper}>
          <Icon
            type="Entypo"
            name="plus"
            style={styles.actionIcon}
          />
        </View>
      </View>
    )
  },
  {
    key: 2,
    name: "call",
    render: () => (
      <View style={styles.actionWrapper}>
        <View style={styles.actionTextWrapper}>
          <Text style={styles.actionText}>PLACE A CALL</Text>
        </View>
        <View style={styles.actionIconWrapper}>
          <Icon
            type="Entypo"
            name="plus"
            style={styles.actionIcon}
          />
        </View>
      </View>
    )
  }
];

const BottomActionMenu = () => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <FloatingAction
        actions={actions}
        distanceToEdge={20}
        overlayColor="rgba(0,0,0,0.7)"
        onPressItem={name => {
          Alert.alert("Icon pressed", `the icon ${name} was pressed`);
        }}
      />
    </View>
  );
};

export default BottomActionMenu;
