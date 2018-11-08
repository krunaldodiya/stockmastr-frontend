import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './tabs/HomeScreen';
import NotificationsScreen from './tabs/NotificationsScreen';
import NewsScreen from './tabs/NewsScreen';
import SettingsScreen from './tabs/SettingsScreen';

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon size={28} name="home" style={{ color: tintColor }} />,
      },
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon size={22} name="bell" style={{ color: tintColor }} />,
      },
    },
    Adding: {
      screen: () => null,
      navigationOptions: () => ({
        tabBarIcon: (
          <View
            style={{
              borderRadius: 60,
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginHorizontal: 10,
              backgroundColor: '#48A2F8',
              bottom: 23,
              width: 60,
              height: 60,
              justifyContent: 'center',
            }}
          >
            <Icon name="plus" color="white" size={24} style={{ textAlign: 'center' }} />
          </View>
        ),
      }),
    },
    News: {
      screen: NewsScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon size={22} name="file-text" style={{ color: tintColor }} />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon size={22} name="bars" style={{ color: tintColor }} />,
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false, // hide labels
      activeTintColor: '#F8F8F8', // active icon color
      inactiveTintColor: '#586589', // inactive icon color
      style: {
        backgroundColor: '#171F33', // TabBar background
      },
    },
  },
);

export default AppTabNavigator;
