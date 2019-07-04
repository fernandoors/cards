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
      <Quiz
        deck={decks}
        id={navigation.state.params.id}
        navigation={navigation}
      />
    </View>
  )
}

QuizScreen.navigationOptions = (props) => ({
  title: `Start Quiz from ${props.navigation.state.params.deckTitle}`,
  headerRight: (
    <Button
      onPress={() => alertView(props.navigation)}
      title="Quit"
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