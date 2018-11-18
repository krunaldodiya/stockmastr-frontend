import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard
} from "react-native";
// 3rd
import Spinner from "react-native-loading-spinner-overlay";
// style
import styles from "../../styles/UseTypeScreen";
// theme
import theme from "../../libs/theme";
import Switch from "../../components/Switch";
import IconSet from "../../libs/icon_set";
import { graph } from "../../services";
import { api } from "../../libs/api";
// images
const phoneHand = require("../../../assets/images/phone-hand.png");

const citiesList = require("../../../assets/js/cities.json");

class UserTypeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    const { navigation } = props;
    const { user } = navigation.state.params;

    this.state = {
      error: false,
      spinner: false,
      cities: [],
      user,
      selectedLocation:
        user.city && user.state ? `${user.city}, ${user.state}` : null
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      this.setState({ error: false })
    );
  }

  createUserProfile = async () => {
    const { user } = this.state;
    const { navigation } = this.props;

    try {
      this.setState({ spinner: true });

      const data = await graph(api.createUserProfile, {
        ...user,
        profile_updated: true
      });

      this.setState({ spinner: false });
      return navigation.replace("TabScreen", { user: data.user });
    } catch ({ error }) {
      this.setState({ spinner: false, error });
    }
  };

  updateUserData = (key, value) => {
    const { user } = this.state;
    user[key] = value;

    this.setState({ user });
  };

  handleTextChange = keywords => {
    this.setState({ selectedLocation: keywords });

    if (keywords.length > 2) {
      const data = citiesList.filter(city => {
        return city.name.match(new RegExp(`^${keywords}`, "gi"));
      });

      this.setState({ cities: data });
    }
  };

  render() {
    const { error, spinner, cities, user, selectedLocation } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={styles.container}
      >
        <Spinner
          visible={spinner}
          textContent="Loading..."
          textStyle={styles.spinner}
          overlayColor="rgba(0,0,0,0.8)"
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Image style={{ width: 130, height: 130 }} source={phoneHand} />
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Text
            style={{
              fontSize: 22,
              textAlign: "center",
              color: "#ffffff",
              fontFamily: theme.fonts.TitilliumWebSemiBold
            }}
          >
            USER PROFILE
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginTop: 30
          }}
        >
          <View
            style={{
              borderColor: error ? "#e74c3c" : "#ededed",
              marginHorizontal: 30,
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              fontFamily: theme.fonts.TitilliumWebRegular
            }}
          >
            <TextInput
              placeholder={
                error && error.errors.name ? error.errors.name[0] : "Full Name"
              }
              placeholderTextColor={error ? "#e74c3c" : "#ededed"}
              autoCorrect={false}
              value={user.name}
              onChangeText={name => this.updateUserData("name", name)}
              style={{
                color: "white",
                paddingLeft: 10,
                fontFamily: theme.fonts.TitilliumWebRegular
              }}
            />

            <View
              style={{
                width: "100%",
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: error ? "#e74c3c" : "#ededed"
              }}
            />

            <TextInput
              placeholder={
                error && error.errors.email
                  ? error.errors.email[0]
                  : "Email Address"
              }
              placeholderTextColor={error ? "#e74c3c" : "#ededed"}
              autoCorrect={false}
              value={user.email}
              onChangeText={email => this.updateUserData("email", email)}
              style={{
                color: "white",
                paddingLeft: 10,
                fontFamily: theme.fonts.TitilliumWebRegular
              }}
            />

            <View
              style={{
                width: "100%",
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: error ? "#e74c3c" : "#ededed"
              }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 1 }}>
                <TextInput
                  ref={location => (this.location = location)}
                  placeholder={
                    error && error.errors.city
                      ? error.errors.city[0]
                      : "Location"
                  }
                  placeholderTextColor={error ? "#e74c3c" : "#ededed"}
                  value={selectedLocation}
                  editable={!user.city}
                  clearButtonMode="always"
                  onChangeText={keywords => this.handleTextChange(keywords)}
                  style={{
                    color: "white",
                    paddingLeft: 10,
                    fontFamily: theme.fonts.TitilliumWebRegular
                  }}
                />
              </View>

              {user.city && (
                <TouchableOpacity
                  style={{ paddingRight: 10, justifyContent: "center" }}
                  onPress={() => {
                    this.setState({
                      selectedLocation: null,
                      user: { ...user, city: null, state: null }
                    });

                    this.location.focus();
                  }}
                >
                  <IconSet
                    type="MaterialIcons"
                    name="cancel"
                    size={22}
                    color="whitesmoke"
                    style={styles.actionIcon}
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
                  style={{ color: "white", padding: 10 }}
                  onPress={() =>
                    this.setState({
                      cities: [],
                      selectedLocation: `${city.name}, ${city.state}`,
                      user: {
                        ...user,
                        city: city.name,
                        state: city.state
                      }
                    })
                  }
                >
                  {`${city.name}, ${city.state}`}
                </Text>
              ))}
            </ScrollView>
          </View>

          <View style={{ marginTop: 30 }}>
            <Switch
              options={["Male", "Female"]}
              selected={user.gender}
              onChange={gender => this.updateUserData("gender", gender)}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Switch
              options={["Trader", "Provider"]}
              selected={user.type}
              onChange={type => this.updateUserData("type", type)}
            />
          </View>

          <View style={styles.submitButtonWrapper}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.createUserProfile()}
            >
              <Text style={styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default UserTypeScreen;
