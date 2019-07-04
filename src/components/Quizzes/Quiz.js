import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { handleSaveResult } from '../../store/actions/decks';
import { connect } from 'react-redux'
import { clearLocalNotification } from '../../services/utils';

class Quiz extends PureComponent {
  state = {
    showAnswer: false,
    showCard: 0,
    results: 0,
    total: 0,
  }
  handleResult = async () => {
    const { results, total } = this.state
    const deck = this.props.deck.filter(deck => deck.id === this.props.id)
    this.props.saveResult(deck[0].id, results, total)
    clearLocalNotification()
    this.setState({ results: '', total: '', showCard: 0 }, () => this.props.navigation.navigate('Result', { id: deck[0].id, deckTitle: deck[0].title, results, total }))
  }
  handleNextCard = (correct = true) => {
    const { results, total, showCard } = this.state
    if (correct) {
      return this.setState({
        results: results + 1,
        total: total + 1,
        showCard: showCard + 1,
        showAnswer: false,
      })
    }
    this.setState({
      total: total + 1,
      showAnswer: false,
      showCard: showCard + 1,
    })
  }
  render() {
    const { showAnswer, showCard } = this.state
    return (
      <View style={styles.container}>
        {this.props.deck.filter(card => card.id === this.props.id).map(({ cards }, index) =>
          <View key={index}>
            {showCard < cards.length &&
              <View>
                <View style={styles.cardView}>
                  <Text style={styles.cardTitle}>Question {`${showCard + 1}/${cards.length}`} </Text>
                  <Text style={styles.cardText}>{cards[showCard].question}</Text>
                </View>
                {showAnswer &&
                  <View style={styles.cardView}>
                    <Text style={styles.cardTitle}>Answer</Text>
                    <Text style={styles.cardText}>{cards[showCard].answer}</Text>
                  </View>
                }
                {!showAnswer ?
                  <TouchableOpacity
                    style={[styles.buttons, { width: '80%', alignSelf: 'center' }]}
                    onPress={() => this.setState({ showAnswer: true })}
                  >
                    <Text style={styles.buttonsText}>
                      Show Answer
                  </Text>
                  </TouchableOpacity>
                  : <View style={styles.options}>
                    <TouchableOpacity
                      style={styles.buttons}
                      onPress={() => this.handleNextCard(false)}
                    >
                      <Text style={[styles.buttonsText, { color: 'red' }]}>
                        Incorrect
                  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttons}
                      onPress={this.handleNextCard}
                    >
                      <Text style={styles.buttonsText}>
                        Correct
                  </Text>
                    </TouchableOpacity>
                  </View>

                }
              </View>}
            {cards.length === showCard &&
              <View>
                <Text style={styles.cardTitle}>Great, you finished this quiz!</Text>
                <Text style={styles.cardText}>Touch in Finish below to see your result</Text>
                <TouchableOpacity
                  style={[styles.buttons, { width: '80%', alignSelf: 'center', marginTop: 20 }]}
                  onPress={this.handleResult}
                >
                  <Text style={styles.buttonsText}>
                    Finish
                  </Text>
                </TouchableOpacity>
              </View>}
          </View>
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    color: 'black',
  },
  cardText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    alignItems: 'center',
    borderRadius: 4,
    width: 150,
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

const mapDispatchToProps = dispatch => {
  return {
    saveResult: (deckId, result, total) => dispatch(handleSaveResult(deckId, result, total)),
  }
}
export default connect(null, mapDispatchToProps)(Quiz)