import React from "react";
import { View, Text } from "native-base";

import { getAuthUser } from '../../libs/auth';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>chat</Text>
            </View>
        )
    }
}