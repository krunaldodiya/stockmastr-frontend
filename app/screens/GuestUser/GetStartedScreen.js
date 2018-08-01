import React from 'react';
import { NetInfo, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  View, Text, Button, Container, Form, Item, Content, Label,
} from 'native-base';

// components
import theme from '../../libs/theme';
import NoNetwork from '../../components/NoNetwork';

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 20,
    shadowColor: '#3f2201',
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.background.primary,
  },
});

class GetStartedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      buttonText: 'Agree & Continue',
      termsText: 'lorem ipsum',
      connectionInfo: null,
    };
  }

  async componentWillMount() {
    NetInfo.addEventListener('connectionChange', connectionInfo => this.handleConnectionChanged(connectionInfo));
    const connectionInfo = await NetInfo.getConnectionInfo();

    this.handleConnectionChanged(connectionInfo);
  }

  handleConnectionChanged(connectionInfo) {
    this.setState({ connectionInfo });
  }

  render() {
    const { connectionInfo, buttonText, termsText } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {connectionInfo && (
          <View style={{ flex: 1 }}>
            {connectionInfo.type === 'none' && <NoNetwork />}

            {connectionInfo.type !== 'none' && (
              <Container
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  backgroundColor: theme.background.secondary,
                  alignItems: 'center',
                }}
              >
                <Form>
                  <View style={{ flex: 1 }}>
                    <Label
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: 28,
                        marginVertical: 20,
                      }}
                    >
                      Terms of service
                    </Label>

                    <Content bounces={false}>
                      <Text>
                        {termsText}
                      </Text>
                    </Content>
                  </View>

                  <View
                    style={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Item
                      style={{
                        marginBottom: 20,
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <Button
                        style={styles.submitButton}
                        onPress={() => navigation.replace('OauthScreen')}
                      >
                        <Text style={{ width: '100%', textAlign: 'center' }}>
                          {buttonText}
                        </Text>
                      </Button>
                    </Item>
                  </View>
                </Form>
              </Container>
            )}
          </View>
        )}
      </View>
    );
  }
}

GetStartedScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

export default GetStartedScreen;
