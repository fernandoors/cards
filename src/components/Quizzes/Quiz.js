import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class Quiz extends Component {
  state = {
    showAnswer: false,
    deckLength: '',
    answers: '',
    remaining: '',
  }
  componentDidMount(){
    // console.log(this.props.deck)
  }
  render() {
    return (
      <View>
        <View>
          <Text>Start Quiz Page</Text>
          <Text>Quiz</Text>
        </View>
        <TouchableOpacity>
          <View>
            <Text>
              Incorrect 😢
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>
              Correct 😃
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Quiz