import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/Common/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDeckScreen from '../screens/AddDeckScreen';
import AddCardsScreen from '../screens/AddCardsScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import PushScreen from '../screens/PushSettingsScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddCard: AddCardsScreen,
  DeckDetailScreen,
  Quiz: QuizScreen,
  Result: ResultScreen
});

const PushSettingsStack = createStackNavigator({
  PushSettings: PushScreen,
});

const AddDeck = createStackNavigator({
  AddDeck: AddDeckScreen,
  AddCard: AddCardsScreen,
}, {
    initialRouteName: 'AddDeck',
  });

AddDeck.navigationOptions = {
  tabBarLabel: 'Add Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

PushSettingsStack.navigationOptions = {
  tabBarLabel: 'Push Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-send' : 'md-send'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    AddDeck,
    HomeStack,
    PushSettingsStack,
  },
  {
    initialRouteName: 'HomeStack',
    resetOnBlur: true
  }
);
