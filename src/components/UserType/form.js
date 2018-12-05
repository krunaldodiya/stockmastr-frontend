import { Button, Form, Input, Item, Text, View } from "native-base";
import React from "react";
import Switch from "../shared/Switch";
import Location from "./location";
import styles from "./styles";

const citiesList = require("../../../assets/js/cities.json");

class UserTypeForm extends React.Component {
  constructor(props) {
    super(props);

    const { city, state } = props.auth.authUser;

    this.state = {
      cities: [],
      selectedLocation: city && state ? `${city}, ${state}` : null,
      authUser: props.auth.authUser
    };
  }

  handleLocationChange = keywords => {
    this.setState({ selectedLocation: keywords });

    if (keywords.length > 2) {
      const data = citiesList.filter(city => {
        return city.name.match(new RegExp(`^${keywords}`, "gi"));
      });

      this.setState({ cities: data });
    }
  };

  handleLocationClear = () => {
    this.setState({
      selectedLocation: null,
      city: null,
      state: null
    });
  };

  handleLocationSelect = city => {
    this.setState({
      cities: [],
      selectedLocation: `${city.name}, ${city.state}`,
      city: city.name,
      state: city.state
    });
  };

  render() {
    const { auth, navigation, requestOtp } = this.props;
    const { errors, loading } = auth;
    const { cities, selectedLocation, authUser } = this.state;

    return (
      <Form style={styles.formWrapper}>
        <View style={styles.inputGroup(errors)}>
          <Item style={styles.inputWrapper}>
            <Input
              placeholder={errors ? errors.errors.name[0] : "Full Name"}
              placeholderTextColor={errors ? "#e74c3c" : "#000"}
              autoCorrect={false}
              value={authUser.name}
              onChangeText={name => this.updateUserData("name", name)}
              style={styles.input(true)}
            />
          </Item>

          <Item style={styles.inputWrapper}>
            <Input
              placeholder={errors ? errors.errors.email[0] : "Email Address"}
              placeholderTextColor={errors ? "#e74c3c" : "#000"}
              autoCorrect={false}
              value={authUser.email}
              onChangeText={email => this.updateUserData("email", email)}
              style={styles.input(true)}
            />
          </Item>

          <Item style={styles.inputWrapper}>
            <Location
              authUser={authUser}
              errors={errors}
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
              onChange={gender => this.updateUserData("gender", gender)}
            />
          </Item>

          <Item style={styles.submitButtonWrapper}>
            <Button
              rounded
              small
              disabled={loading}
              style={styles.submitButton}
              onPress={() =>
                requestOtp({ mobile, navigation, mode: "request" })
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
