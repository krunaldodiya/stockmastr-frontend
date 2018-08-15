import React from 'react';
import { StyleSheet } from 'react-native';

import {
  View,
  Text,
  Input,
  Container,
  Item,
  Icon,
  Header,
  Left,
  Body,
  Right,
  Textarea,
} from 'native-base';

import theme from '../../libs/theme';

const styles = StyleSheet.create({
  cancelIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },

  checkIcon: {
    padding: 10,
    color: 'white',
    fontSize: 26,
  },
});

export default class EditPostScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      channel: {
        title: '',
        description: '',
      },
    };
  }

  editPost = () => {
    //
  };

  updateData = (key, value) => {
    const { channel } = this.state;
    channel[key] = value;

    this.setState({ channel });
  };

  render() {
    const { channel } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <Header style={{ backgroundColor: theme.background.primary }}>
          <Left>
            <Icon
              type="MaterialIcons"
              name="arrow-back"
              style={styles.cancelIcon}
              onPress={() => navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ color: 'white', fontSize: 14 }}>
CREATE A CHANNEL
            </Text>
          </Body>
          <Right>
            <Icon
              type="MaterialIcons"
              name="check"
              style={styles.checkIcon}
              onPress={this.editPost}
            />
          </Right>
        </Header>

        <View style={{ flex: 1, backgroundColor: theme.background.secondary, padding: 10 }}>
          <Item
            style={{
              width: '100%',
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: 'white',
              marginBottom: 5,
              marginLeft: 0,
            }}
          >
            <Input
              style={{
                paddingLeft: 20,
                paddingTop: 0,
                paddingBottom: 0,
                fontSize: 14,
              }}
              onChangeText={title => this.updateData('title', title)}
              underlineColorAndroid="transparent"
              value={channel.title}
              placeholder="Channel Title"
              returnKeyType="next"
            />
          </Item>

          <Item
            style={{
              width: '100%',
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: 'white',
              marginBottom: 5,
              marginLeft: 0,
            }}
          >
            <Textarea
              rowSpan={5}
              style={{
                paddingLeft: 20,
                paddingVertical: 20,
                fontSize: 14,
                width: '100%',
              }}
              onChangeText={description => this.updateData('description', description)}
              underlineColorAndroid="transparent"
              value={channel.description}
              placeholder="Channel Description"
              returnKeyType="next"
            />
          </Item>
        </View>
      </Container>
    );
  }
}
