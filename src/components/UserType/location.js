import { Icon, Input, Text, View } from "native-base";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import theme from "../../libs/theme";
import styles from "./styles";

const Location = props => {
  const {
    auth,
    cities,
    selectedLocation,
    handleLocationChange,
    handleLocationClear,
    handleLocationSelect
  } = props;

  const { authUser, errors } = auth;
  const { city, state } = authUser;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Input
          ref={c => (this.location = c)}
          editable={!(city && state)}
          placeholder={
            errors && (errors.errors.city || errors.errors.state)
              ? errors.errors.city[0] || errors.errors.state[0]
              : "Select a Location"
          }
          placeholderTextColor={errors ? "#e74c3c" : "#000"}
          autoCorrect={false}
          value={selectedLocation}
          onChangeText={keywords => handleLocationChange(keywords)}
          style={styles.input(false)}
        />

        {city && (
          <TouchableOpacity
            style={{ paddingRight: 10, justifyContent: "center" }}
            onPress={() => {
              handleLocationClear();
              this.location._root.focus();
            }}
          >
            <Icon
              type="MaterialIcons"
              name="cancel"
              style={{ color: "#3d3d3d", fontSize: 22 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {cities.map(city => (
          <Text
            key={city.id}
            autoCorrect={false}
            style={{
              color: "#000",
              padding: 10,
              fontFamily: theme.fonts.TitilliumWebRegular,
              fontSize: 16
            }}
            onPress={() => handleLocationSelect(city)}
          >
            {`${city.name}, ${city.state}`}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default Location;
