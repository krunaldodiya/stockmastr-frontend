import React from 'react';
import { StyleSheet } from "react-native";
import { View, Text } from 'native-base';

// component
import Comment from '../../components/Comment';

export default class CommentScreen extends React.Component {
    componentWillMount() {
        const { params } = this.props.navigation.state;
        console.log(params);
    }

    render() {
        return (
            <View style={styles.container}>
                <Comment {...this.props} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})