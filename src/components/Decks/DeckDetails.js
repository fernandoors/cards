import React from 'react'
import { View, Text, Alert, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { handleRemoveDeck } from '../../store/actions/decks';
import { connect } from 'react-redux'

const DeckDetails = props => {
  const route = (route) => { props.navigation.navigate(route, { id: props.id, deckTitle: props.title }) }

  const showAlert = (id) => {
    Alert.alert(
      'Delete Deck - ' + props.title,
      'Would you like to delete this deck?',
      [
        { text: 'Cancel', onPress: () => { } },
        {
          text: 'Delete', onPress: () => {
            props.deleteDeck(id)
            props.navigation.navigate('Home', { id: props.id, deckTitle: props.title })
          }
        },
      ],
      { cancelable: false }
    )
  }
  return (
    <View style={styles.container} >
      <Text style={styles.title}>
        {props.title}
      </Text>
      <View style={styles.description}>
        <Text style={styles.detail}>
          Cards: {props.description}
        </Text>
        <Text style={styles.detail}>
          Create At: {props.createAt}
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={props.description === 0}
          onPress={() => route('Quiz')}
        >
          <Text style={[styles.button, props.description === 0 ? { color: 'gray' } : {}]}>
            <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-arrow-dropright-circle' : 'md-arrow-dropright-circle'} /> Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddCard', { id: props.id, deckTitle: props.title })}
        >
          <Text style={styles.button}>
            <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} /> Create New Question
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => showAlert(props.id)}
        >
          <Text style={styles.button}>
            <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'} /> Delete Card
          </Text>
        </TouchableOpacity>
      </View>
      {props.results.length > 0 &&
        <View style={styles.center}>
          <Text style={styles.resultTitle}>Lasts results</Text>
          {props.results.map((res, key) => res.total > 0 &&
            <View style={styles.resultView} key={key}>
              <Text style={styles.resultDesc}>Date: {res.createAt}</Text>
              <Text style={styles.resultDesc}>Result: {res.result > 0 ? res.result : 0} | {(res.result * 100 / res.total).toFixed(0)}% </Text>
            </View>
          )}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.9,
    borderColor: '#efefef',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 3,
    margin: 5,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    color: `#007AFF`,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    margin: 13,
    color: `#007AFF`,
    fontSize: 14,
    justifyContent: 'space-between',
  },
  button: {
    margin: 10,
    alignSelf: 'center',
    fontSize: 14,
    color: '#007AFF'
  },
  cancel: {
    color: 'red'
  },
  resultView: {
    flex: 1,
    width: `90%`,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.9,
    borderColor: '#ececec',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    marginTop: 5,
    marginBottom: 10,
    padding: 5
  },
  resultTitle: {
    color: 'black',
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resultDesc: {
    fontSize: 18,
    alignItems: 'center',
    textAlign: `center`,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapDispatchToProps = dispatch => {
  return {
    deleteDeck: id => dispatch(handleRemoveDeck(id)),
  }
}
export default connect(null, mapDispatchToProps)(DeckDetails)