import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function QuizResult({ navigation }) {
  // { id: props.id, deckTitle: props.title }
  const { results, total, id, deckTitle } = navigation.state.params
  const route = (route) => { navigation.navigate(route, { id, deckTitle }) }
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Text style={styles.cardTitle}>Your Result is:</Text>
        <Text style={styles.cardTitle}>{results > 0 ? results : 0} | {(results*100/total).toFixed(0)}%</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => route(`DeckDetailScreen`)}
        >
          <Text style={styles.buttonsText}>
            Go back to Deck
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => route(`Quiz`)}
        >
          <Text style={styles.buttonsText}>
            Restart Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
  },
  cardView: {
    borderRadius: 4,
    borderWidth: 0.9,
    borderColor: '#efefef',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 3,
    margin: 5,
    marginBottom: 20,
  },
  cardTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: `black`,
  },
  cardText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: `#007AFF`,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    alignItems: 'center',
    borderRadius: 4,
    width: 180,
    borderWidth: 0.9,
    color: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonsText: {
    fontSize: 30,
    alignItems: 'center',
    color: '#007AFF',
    borderColor: '#007AFF',
  },
});
