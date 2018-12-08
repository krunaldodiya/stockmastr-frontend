import { Button, Text, View } from "native-base";
import React from "react";
import styles from "./styles";

export default class Timer extends React.Component {
  state = {
    time: 20
  };

  async componentDidMount() {
    this.startTimer();
  }

  startTimer = async () => {
    this.interval = setInterval(() => {
      const { time } = this.state;

      if (time === 0) clearInterval(this.interval);
      if (time > 0) {
        this.setState({ time: time - 1 });
      }
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeMobile = navigation => (
    <View style={styles.changeMobileWrapper}>
      <Button
        bordered
        small
        style={styles.changeMobileButton}
        onPress={() => navigation.replace("RequestOtpScreen")}
      >
        <Text style={styles.changeMobileText}>RESEND OTP</Text>
      </Button>
    </View>
  );

  counter = time => (
    <View style={styles.timerWrapper}>
      <View style={styles.timer}>
        <Text style={styles.timerText}>{time}</Text>
      </View>
    </View>
  );

  render() {
    const { time } = this.state;
    const { navigation } = this.props;

    return time > 0 ? this.counter(time) : this.changeMobile(navigation);
  }
}
