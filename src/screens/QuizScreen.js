import React from 'react'
import { View, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import Quiz from '../components/Quizzes/Quiz';

const alertView = (navigation) => {
  return (
    Alert.alert(
      'Exit this question',
      'Would like to discard this question?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ],
      { cancelable: false },
    )
  )
}
function QuizScreen({ navigation, decks }) {
  return (
    <View style={{ flex: 1 }}>
      {decks.filter(deck => deck.id === navigation.state.params.id).map((deck, index) =>
        <Quiz
          deck={deck}
          key={index}
          index={index}
          navigation={navigation}
        />
      )}
    </View>
  )
}

QuizScreen.navigationOptions = (props) => ({
  title: `Start Quiz from ${props.navigation.state.params.deckTitle}`,
  headerRight: (
    <Button
      onPress={() => alertView(props.navigation)}
      title="Finish"
      color="#007AFF"
    />
  )
});

const mapStateToProps = (state) => {
  return {
    decks: state
  }
}
export default connect(mapStateToProps)(QuizScreen)