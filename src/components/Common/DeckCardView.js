import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { handleRemoveDeck } from '../../store/actions/decks';
import { connect } from 'react-redux'

const DeckCardView = props => {
  const route = (route) => { props.navigation.navigate(route, { id: props.id, deckTitle: props.title }) }
  return (
    <View style={styles.container} >
      <TouchableOpacity
        onPress={() => {
          route('DeckDetailScreen')
        }}
      >
        <Text style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.description}>
          <Text style={styles.detail}>
            Cards: {props.description}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
          {props.description === 0 ?
             <TouchableOpacity
             onPress={() => {
               route('AddCard')
             }}
           >
             <Text style={styles.button}>
               <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} /> Add Question
           </Text>

           </TouchableOpacity>
          :
            <TouchableOpacity
              onPress={() => {
                route('Quiz')
              }}
            >
              <Text style={styles.button}>
                <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-arrow-dropright-circle' : 'md-arrow-dropright-circle'} /> Start Quiz
            </Text>

            </TouchableOpacity>
          }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.9,
    borderColor: '#ececec',
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
    color: '#007AFF',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detail: {
    margin: 13,
    color: '#007AFF',
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
  }
});
const mapDispatchToProps = dispatch => {
  return {
    deleteDeck: id => dispatch(handleRemoveDeck(id)),
  }
}
export default connect(null, mapDispatchToProps)(DeckCardView)