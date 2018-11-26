import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
// 3rd
import Spinner from "react-native-loading-spinner-overlay";
// style
import styles from "../../styles/RequestOtpScreen";
// services
import {
  login,
  sendOtp,
  makeSocialAuth,
  checkUserExists,
  createUser,
  getInitialScreen
} from "../../services";
// theme
import theme from "../../libs/theme";

// images
const phoneHand = require("../../../assets/images/phone-hand.png");
const facebookLogin = require("../../../assets/images/facebook.png");
const googleLogin = require("../../../assets/images/google.png");

class SocialAuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      email: null,
      error: false,
      spinner: false
    };
  }

  socialAuth = async gateway => {
    const { navigation, client } = this.props;

    setTimeout(() => {
      this.setState({ spinner: true });
    }, 1000);

    try {
      const info = await makeSocialAuth(gateway);
      const { email, name } = info.user;

      let user = await checkUserExists(client, { email });
      if (!user) {
        user = await createUser(client, { email, name });
      }

      const token = await login(client, { email });
      const screen = await getInitialScreen();

      this.setState({ spinner: false });

      return token ? navigation.replace(screen, { user }) : false;
    } catch (e) {
      this.setState({ spinner: false });
    }
  };

  sendOtp = async () => {
    const { email } = this.state;
    const { navigation } = this.props;

    this.setState({ spinner: true });

    try {
      const { data } = await sendOtp(email);

      this.setState({ spinner: false });
      return data ? navigation.replace("VerifyOtpScreen", data) : false;
    } catch (error) {
      this.setState({ spinner: false, error: true });
    }
  };

  render() {
    const { error, spinner } = this.state;

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
              fontSize: 26,
              textAlign: "center",
              color: "#ffffff",
              fontFamily: theme.fonts.TitilliumWebSemiBold
            }}
          >
            LOGIN
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#ffffff",
              marginHorizontal: 20,
              marginTop: 10,
              fontFamily: theme.fonts.TitilliumWebSemiBold
            }}
          >
            Please, Enter your email to receive verification code
          </Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginTop: 30
          }}
        >
          <TextInput
            placeholder="john.doe@example.com"
            placeholderTextColor="#000"
            onChangeText={email => this.setState({ email, error: false })}
            style={{
              borderColor: error ? "red" : "black",
              marginHorizontal: 30,
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 20,
              fontFamily: theme.fonts.TitilliumWebRegular
            }}
          />

          <View style={styles.submitButtonWrapper}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.sendOtp()}
            >
              <Text style={styles.submitButtonText}>SEND OTP</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <View
            style={{
              position: "absolute",
              marginTop: 13,
              borderTopWidth: 1,
              borderTopColor: "#3d3d3d",
              width: "100%"
            }}
          />

          <View style={{ width: 50, backgroundColor: "#68b2e3" }}>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "#3d3d3d",
                fontFamily: theme.fonts.TitilliumWebLight
              }}
            >
              OR
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 40
            }}
            onPress={() => this.socialAuth("facebook")}
          >
            <Image style={{ width: 60, height: 60 }} source={facebookLogin} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 40
            }}
            onPress={() => this.socialAuth("google")}
          >
            <Image style={{ width: 60, height: 60 }} source={googleLogin} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default SocialAuthScreen;
