import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { compose, withApollo } from 'react-apollo';
// 3rd
import Spinner from 'react-native-loading-spinner-overlay';
// style
import styles from '../../styles/UseTypeScreen';
// services
import {
  login, makeSocialAuth, checkUserExists, register, getInitialScreen,
} from '../../services';
// theme
import theme from '../../libs/theme';
import Switch from '../../components/Switch';

// images
const phoneHand = require('../../../assets/images/phone-hand.png');

const citiesList = require('../../../assets/js/cities.json');

class UserTypeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      spinner: false,
      selectedGender: 'Male',
      selectedType: 'Trader',
      cities: [],
      selectedCity: {
        id: null,
        name: null,
        state: null,
      },
    };
  }

  socialAuth = async (gateway) => {
    const { navigation, client } = this.props;

    const info = await makeSocialAuth(gateway);
    const { email, name } = info.user;

    const user = await checkUserExists(client, { email });
    if (!user) await register(client, { email, name });

    const token = await login(email);
    const screen = await getInitialScreen();

    return token ? navigation.replace(screen, { user }) : false;
  };

  updateProfile = async () => {
    //
  };

  setSelectedGender = (selectedGender) => {
    this.setState({ selectedGender });
  };

  setSelectedType = (selectedType) => {
    this.setState({ selectedType });
  };

  handleTextChange = (keywords) => {
    if (keywords.length > 2) {
      const data = citiesList.filter((city) => {
        const regex = new RegExp(`^${keywords}`, 'gi');
        return city.name.match(regex);
      });

      this.setState({ cities: data });
    }
  };

  render() {
    const {
      error, spinner, selectedGender, selectedType, cities, selectedCity,
    } = this.state;

    return (
      <KeyboardAvoidingView behavior="position" enabled style={styles.container}>
        <Spinner
          visible={spinner}
          textContent="Loading..."
          textStyle={styles.spinner}
          overlayColor="rgba(0,0,0,0.8)"
        />

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Image style={{ width: 130, height: 130 }} source={phoneHand} />
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: theme.fonts.TitilliumWebSemiBold,
            }}
          >
            USER PROFILE
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 30,
          }}
        >
          <View
            style={{
              borderColor: error ? 'red' : 'white',
              marginHorizontal: 30,
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              fontFamily: theme.fonts.TitilliumWebRegular,
            }}
          >
            <TextInput
              placeholder="Name"
              placeholderTextColor="#ededed"
              autoCorrect={false}
              onChangeText={() => this.setState({ error: false })}
              style={{
                color: 'white',
                paddingLeft: 10,
                fontFamily: theme.fonts.TitilliumWebRegular,
              }}
            />

            <View
              style={{
                width: '100%',
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: 'white',
              }}
            />

            <TextInput
              placeholder="Location"
              placeholderTextColor="#ededed"
              value={selectedCity.id && `${selectedCity.name}, ${selectedCity.state}`}
              onChangeText={keywords => this.handleTextChange(keywords)}
              style={{
                color: 'white',
                paddingLeft: 10,
                fontFamily: theme.fonts.TitilliumWebRegular,
              }}
            />

            <ScrollView>
              {cities.map(city => (
                <Text
                  autoCorrect={false}
                  style={{ color: 'white', padding: 10 }}
                  onPress={() => this.setState({ cities: [], selectedCity: city })}
                >
                  {`${city.name}, ${city.state}`}
                </Text>
              ))}
            </ScrollView>
          </View>

          <View style={{ marginTop: 60 }}>
            <Switch
              options={['Male', 'Female']}
              selected={selectedGender}
              onChange={this.setSelectedGender}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Switch
              options={['Trader', 'Provider']}
              selected={selectedType}
              onChange={this.setSelectedType}
            />
          </View>

          <View style={styles.submitButtonWrapper}>
            <TouchableOpacity style={styles.submitButton} onPress={() => this.updateProfile()}>
              <Text style={styles.submitButtonText}>
SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default compose(withApollo)(UserTypeScreen);
