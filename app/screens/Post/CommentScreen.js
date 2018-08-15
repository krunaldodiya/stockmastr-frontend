import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';

// component
import Comment from '../../components/Comment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CommentScreen = props => (
  <View style={styles.container}>
    <Comment {...props} />
  </View>
);

export default CommentScreen;
