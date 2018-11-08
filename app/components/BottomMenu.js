import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#0f0f0f',
  },
});

const BottomMenu = (props) => {
  const { currentTab, changeTab } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => changeTab('home')}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Icon
            name="home"
            color={currentTab === 'home' ? 'cyan' : 'white'}
            size={32}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => changeTab('notifications')}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Icon
            name="bell"
            color={currentTab === 'notifications' ? 'cyan' : 'white'}
            size={24}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'yellow',
          borderRadius: 30,
          paddingVertical: 10,
          paddingHorizontal: 13,
          marginHorizontal: 15,
        }}
      >
        <Icon name="plus" color="yellow" size={24} style={{ alignSelf: 'center' }} />
      </View>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => changeTab('news')}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Icon
            name="file-text"
            color={currentTab === 'news' ? 'cyan' : 'white'}
            size={24}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => changeTab('settings')}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Icon
            name="bars"
            color={currentTab === 'settings' ? 'cyan' : 'white'}
            size={28}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;
