import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { View, Text, Input, Button, Container, Form, Item, Content, Icon, Segment, Header, Left, Body, Right, Textarea } from 'native-base';

import axios from 'axios';
import theme from '../../libs/theme';

export default class EditPostScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channel: {
                title: "",
                description: ""
            }
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: theme.background.primary }}>
                    <Left>
                        <Icon
                            type="MaterialIcons"
                            name="arrow-back"
                            style={styles.cancelIcon}
                            onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Text style={{ color: 'white', fontSize: 14 }}>CREATE A CHANNEL</Text>
                    </Body>
                    <Right>
                        <Icon
                            type="MaterialIcons"
                            name="check"
                            style={styles.checkIcon}
                            onPress={() => this.addChannel()} />
                    </Right>
                </Header>

                <View style={{ flex: 1, backgroundColor: theme.background.secondary, padding: 10 }}>
                    <Item style={{ width: "100%", borderRadius: 10, borderWidth: 1, backgroundColor: 'white', marginBottom: 5, marginLeft: 0 }}>
                        <Input
                            style={{ paddingLeft: 20, paddingTop: 0, paddingBottom: 0, fontSize: 14 }}
                            onChangeText={(title) => this.updateData("title", title)}
                            underlineColorAndroid="transparent"
                            value={this.state.channel.title}
                            placeholder="Channel Title"
                            returnKeyType="next" />
                    </Item>

                    <Item style={{ width: "100%", borderRadius: 10, borderWidth: 1, backgroundColor: 'white', marginBottom: 5, marginLeft: 0 }}>
                        <Textarea
                            rowSpan={5}
                            style={{ paddingLeft: 20, paddingVertical: 20, fontSize: 14, width: "100%" }}
                            onChangeText={(description) => this.updateData("description", description)}
                            underlineColorAndroid="transparent"
                            value={this.state.channel.description}
                            placeholder="Channel Description"
                            returnKeyType="next" />
                    </Item>
                </View>
            </Container>
        );
    }

    updateData(key, value) {
        const state = this.state.channel;
        state[key] = value;

        this.setState({ state })
    }

    addChannel() {
        if (!this.state.channel.title.length || !this.state.channel.description.length) {
            return alert("Title & Description is required");
        }

        this.props.dispatchAddChannel();

        axios.post(api.addChannel, this.state.channel, getHeaders(this.props.auth.token))
            .then(({ data }) => {                
                this.props.dispatchAddChannelSuccess({ channel_subscription: data.channel_subscription });
                this.props.navigation.goBack();
            })
            .catch(e => {
                this.props.dispatchAddChannelFail();
            })
    }
}

const styles = StyleSheet.create({
    cancelIcon: {
        padding: 10,
        color: 'white',
        fontSize: 26
    },

    checkIcon: {
        padding: 10,
        color: 'white',
        fontSize: 26
    }
})