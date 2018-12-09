import { Text, View } from "native-base";
import React from "react";
import SideDrawer from "../../shared/SideDrawer";

const Notifications = props => (
  <SideDrawer {...props}>
    <View style={{ padding: 20 }}>
      <Text>Notifications</Text>
    </View>
  </SideDrawer>
);

export default Notifications;
