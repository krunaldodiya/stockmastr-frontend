import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { compose, withApollo } from 'react-apollo';
// 3rd
import Spinner from 'react-native-loading-spinner-overlay';
// style
import styles from '../../styles/UseTypeScreen';
// services
// theme
import theme from '../../libs/theme';
import Switch from '../../components/Switch';

import { updateUser } from '../../services';
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
      id: null,
      name: null,
      selectedGender: 'Male',
      selectedType: 'Trader',
      cities: [],
      selectedLocation: {
        id: null,
        name: null,
        state: null,
      },
    };
  }

  async componentWillMount() {
    const { navigation } = this.props;

    if (!navigation.state.params) {
      return console.log('logout');
    }

    console.log(navigation);
    
    const { id, name } = navigation.state.params.user;
    return this.setState({ id, name });
  }

  updateProfile = async () => {
    const {
      id, selectedLocation, name, selectedGender, selectedType,
    } = this.state;
    const { client } = this.props;

    if (!selectedLocation.id) Alert.alert('Oops', 'Please, select a city.');
    if (name < 5) Alert.alert('Oops', 'Please, Provide your full name.');

    const user = await updateUser(client, {
      id,
      name,
      city: selectedLocation.name,
      state: selectedLocation.state,
      gender: selectedGender,
      type: selectedType,
      profile_updated: true,
    });

    console.log(user);
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
      error,
      spinner,
      selectedGender,
      selectedType,
      cities,
      selectedLocation,
      name,
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
              value={name}
              onChangeText={input => this.setState({ name: input })}
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
              value={selectedLocation.id && `${selectedLocation.name}, ${selectedLocation.state}`}
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
                  onPress={() => this.setState({ cities: [], selectedLocation: city })}
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
