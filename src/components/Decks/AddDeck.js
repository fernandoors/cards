import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Alert, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { addDeck } from '../../store/actions/decks';
import { generateUID } from '../../../services/utils';


class AddDeck extends Component {
  state = {
    deckTitle: '',
    report: ''
  }
  handleSaveDeck = () => {
    const { deckTitle } = this.state
    const id = generateUID()
    if (!deckTitle) return this.setState({ report: "Please input deck's title" })
    this.props.saveDeck(id, deckTitle)
    this.setState({ deckTitle: '', report: '' }, () => this.props.navigation.navigate('AddCard', { id, deckTitle }))
  }
  alertView = () => {
    return (
      Alert.alert(
        'Discard Deck',
        'Would like to discard this deck?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.setState({ deckTitle: '', report: '' }, () => this.props.navigation.navigate('HomeStack')) },
        ],
        { cancelable: false },
      )
    )
  }
  render() {
    const { deckTitle } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Deck Title</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput placeholder="Input deck's title." 
              style={styles.input} 
              value={deckTitle} 
              onChangeText={deckTitle => this.setState({ deckTitle })} 
              returnKeyType='send'
              onSubmitEditing={()=>this.handleSaveDeck()}
              />
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={styles.buttons} onPress={this.alertView}>
              <Text style={styles.buttonsText}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => this.handleSaveDeck()}>
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
    paddingTop: 15,
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
    height: 40,
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
    saveDeck: (id, deck) => dispatch(addDeck(id, deck)),
  }
}
export default connect(null, mapDispatchToProps)(AddDeck)