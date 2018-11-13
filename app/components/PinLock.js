import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Lock = () => (
  <View style={{ marginTop: 100 }}>
    <View
      style={{
        borderBottomWidth: 1,
        width: 200,
        justifyContent: "space-between",
        alignSelf: "center",
        flexDirection: "row"
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {pin.map(x => (
          <IconSet
            type="FontAwesome"
            name="circle"
            style={{
              fontSize: 26,
              marginBottom: 20,
              marginLeft: 10
            }}
          />
        ))}
      </View>

      <View>
        <IconSet
          type="Entypo"
          name="erase"
          style={{
            fontSize: 26,
            marginBottom: 20,
            marginLeft: 20
          }}
          onPress={() => this.unsetDigit()}
        />
      </View>
    </View>

    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignSelf: "center",
        width: 210,
        marginTop: 30
      }}
    >
      {numbers.map(num => (
        <TouchableOpacity
          onPress={() => this.setDigit(num)}
          style={{
            width: 50,
            height: 50,
            margin: 10,
            borderColor: "#000",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 100
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 28,
              fontFamily: theme.fonts.TitilliumWebRegular
            }}
          >
            {num}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
