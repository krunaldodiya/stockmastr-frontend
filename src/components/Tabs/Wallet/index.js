import { Text, View } from "native-base";
import React from "react";
import SideDrawer from "../../shared/SideDrawer";

const Wallet = props => (
  <SideDrawer {...props}>
    <View style={{ padding: 20 }}>
      <Text>Wallet</Text>
    </View>
  </SideDrawer>
);

export default Wallet;
