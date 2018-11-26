import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";
import styles from "../../styles/GetStartedScreen";
import { Markdown } from "../../components/Markdown";

const contract = require("../../../assets/images/contract.png");

class GetStartedScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      agree: false
    };
  }

  render() {
    const { agree } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.termsWrapper}>
          <Image style={styles.termsIcon} source={contract} />

          <Text style={styles.termsHeader}>TERMS & CONDITIONS</Text>
        </View>

        <ScrollView>
          <View style={styles.termsBody}>
            <Markdown />
          </View>
        </ScrollView>

        <View style={styles.blurView}>
          <View style={styles.agreeWrapper}>
            <CheckBox
              isChecked={agree}
              checkedColor="white"
              onClick={() => this.setState({ agree: !agree })}
            />

            <Text style={styles.agreeText}>
              I have read all the terms & conditions.
            </Text>
          </View>

          <View style={styles.submitButtonWrapper}>
            <TouchableOpacity
              disabled={!agree}
              style={agree ? styles.submitButton : styles.submitButtonDisabled}
              onPress={() => navigation.replace("RequestOtpScreen")}
            >
              <Text
                style={
                  agree
                    ? styles.submitButtonText
                    : styles.submitButtonTextDisabled
                }
              >
                Agree & Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default GetStartedScreen;
