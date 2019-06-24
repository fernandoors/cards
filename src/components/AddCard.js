import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Alert, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { addDeck, addCard } from '../store/actions/decks';


class AddCard extends Component {
  state = {
    cardQuestion: '',
    cardAnswer: '',
    report: ''
  }
  handleSaveCard = () => {
    if (!this.state.cardQuestion) return this.setState({ report: "Please input card question" })
    if (!this.state.cardAnswer) return this.setState({ report: "Please input card answer" })
    this.props.saveCard(this.props.navigation.state.params.id ,this.state.cardQuestion, this.state.cardAnswer)
    this.setState({ cardQuestion: '', cardAnswer: '', report: 'Card added' })
  }
  alertView = () => {
    return (
      Alert.alert(
        'Discard Card',
        'Would like to discard this card?',
        [
          {
            text: 'Cancel',
            onPress: () => { },
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.setState({ cardQuestion: '', cardAnswer: '' }, () => this.props.navigation.navigate('Home')) },
        ],
        { cancelable: false },
      )
    )
  }
  render() {
    const { cardQuestion, cardAnswer } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Card Question</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput placeholder="Input card question." style={styles.input} value={cardQuestion} onChangeText={cardQuestion => this.setState({ cardQuestion })} />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.title}>Card Answer</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput placeholder="Input card answer." style={styles.input} value={cardAnswer} onChangeText={cardAnswer => this.setState({ cardAnswer })} />
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={styles.buttons} onPress={this.alertView}>
              <Text style={styles.buttonsText}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => this.handleSaveCard()}>
              <Text style={styles.buttonsText}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          {!!this.state.report &&
            <View style={styles.report}>
              <Text style={styles.reportText}>
                {this.state.report}
              </Text>
            </View>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: '#fff',
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    borderColor: '#007AFF',
    borderRadius: 4,
    borderWidth: 0.5,
    backgroundColor: '#fff',
    margin: 15,
  },
  title: {
    fontSize: 30,
  },
  input: {
    borderColor: '#007AFF',
    borderRadius: 4,
    borderWidth: 0.9,
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 80,
    fontSize: 20,
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
  report: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reportText: {
    fontSize: 40
  }
});

const mapDispatchToProps = dispatch => {
  return {
    saveCard: (id, question, answer) => dispatch(addCard(id, question, answer)),
  }
}
export default connect(null, mapDispatchToProps)(AddCard)