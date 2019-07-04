import React from 'react'
import { View } from 'react-native'
import QuizResult from '../components/Quizzes/QuizResult';

export default function ResultScreen({ navigation, decks }) {
  return (
    <View style={{ flex: 1 }}>
      <QuizResult
        navigation={navigation}
      />
    </View>
  )
}

QuizResult.navigationOptions = (props) => ({
  title: `Result from ${props.navigation.state.params.deckTitle}`,
});