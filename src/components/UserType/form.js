import { Button, Form, Input, Item, Text, View } from "native-base";
import React from "react";
import Switch from "../shared/Switch";
import Location from "./location";
import styles from "./styles";

const citiesList = require("../../../assets/js/cities.json");

class UserTypeForm extends React.Component {
  constructor(props) {
    super(props);

    const { authUser } = props.auth;
    const { city, state } = authUser;

    this.state = {
      cities: [],
      selectedLocation: city && state ? `${city}, ${state}` : null,
      authUser
    };
  }

  handleLocationChange = selectedLocation => {
    this.setState({ selectedLocation });

    if (selectedLocation.length > 2) {
      const filteredCities = citiesList.filter(city => {
        return city.name.match(new RegExp(`^${selectedLocation}`, "gi"));
      });

      this.setState({ cities: filteredCities });
    }
  };

  handleLocationClear = () => {
    const authUser = { ...this.state.authUser, city: null, state: null };

    this.setState({
      selectedLocation: null,
      authUser
    });
  };

  handleLocationSelect = city => {
    const authUser = {
      ...this.state.authUser,
      city: city.name,
      state: city.state
    };

    this.setState({
      cities: [],
      selectedLocation: `${city.name}, ${city.state}`,
      authUser
    });
  };

  updateUserData = (key, value) => {
    const authUser = { ...this.state.authUser };
    authUser[key] = value;

    this.setState({ authUser });
  };

  render() {
    const { auth, navigation, createUserProfile } = this.props;
    const { errors, loading } = auth;
    const { cities, selectedLocation, authUser } = this.state;

    return (
      <Form style={styles.formWrapper}>
        <View style={styles.inputGroup(errors)}>
          <Item style={styles.inputWrapper}>
            <Input
              placeholder={
                errors && errors.errors.name
                  ? errors.errors.name[0]
                  : "Full Name"
              }
              placeholderTextColor={errors ? "#e74c3c" : "#000"}
              autoCorrect={false}
              value={authUser.name}
              onChangeText={name => this.updateUserData("name", name)}
              style={styles.input(true)}
            />
          </Item>

          <Item style={styles.inputWrapper}>
            <Input
              placeholder={
                errors && errors.errors.email
                  ? errors.errors.email[0]
                  : "Email Address"
              }
              placeholderTextColor={errors ? "#e74c3c" : "#000"}
              autoCorrect={false}
              value={authUser.email}
              onChangeText={email => this.updateUserData("email", email)}
              style={styles.input(true)}
            />
          </Item>

          <Item style={styles.inputWrapper}>
            <Location
              {...this.props}
              cities={cities}
              selectedLocation={selectedLocation}
              handleLocationChange={this.handleLocationChange}
              handleLocationClear={this.handleLocationClear}
              handleLocationSelect={this.handleLocationSelect}
            />
          </Item>
        </View>

        <View style={styles.buttonGroup}>
          <Item style={styles.inputWrapper}>
            <Switch
              {...this.props}
              options={["Male", "Female"]}
              selected={authUser.gender}
              onChange={gender => this.updateUserData("gender", gender)}
            />
          </Item>

          <Item style={styles.inputWrapper}>
            <Switch
              {...this.props}
              options={["Trader", "Provider"]}
              selected={authUser.type}
              onChange={type => this.updateUserData("type", type)}
            />
          </Item>

          <Item style={styles.submitButtonWrapper}>
            <Button
              rounded
              small
              disabled={loading}
              style={styles.submitButton}
              onPress={() =>
                createUserProfile({
                  authUser: { ...authUser, profile_updated: true },
                  navigation
                })
              }
            >
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </Button>
          </Item>
        </View>
      </Form>
    );
  }
}

export default UserTypeForm;
