import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddDeckCardScreen from '../screens/AddDeckCardScreen';
import AddCardsScreen from '../screens/AddCardsScreen';
import QuizScreen from '../screens/QuizScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddCard: AddCardsScreen,
});

const QuizStack = createStackNavigator({
  Quiz: QuizScreen,
});

const AddDeckCard = createStackNavigator({
  AddDeckCard: AddDeckCardScreen,
  AddCard: AddCardsScreen,
});

// export const AddCardStack = createStackNavigator({
//   AddCard: AddCardsScreen,
// });

AddDeckCard.navigationOptions = {
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
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

QuizStack.navigationOptions = {
  tabBarLabel: 'Start All Quizzes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-arrow-dropright' : 'md-arrow-dropright'}
    />
  ),
};

export default createBottomTabNavigator({
  AddDeckCard,
  HomeStack,
  QuizStack,
},
{
  initialRouteName: 'HomeStack',
});
