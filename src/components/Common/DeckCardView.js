import React from 'react'
import { View, Text, Alert, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { removeDeck } from '../../store/actions/decks';
import { connect } from 'react-redux'

const DeckCardView = props => {
  const showAlert = (id) => {
    Alert.alert(
      'Delete Deck - ' + props.title,
      'Would you like to delete this deck?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Delete', onPress: () => props.deleteDeck(id) },
      ],
      { cancelable: false }
    )
  }
  return (
    <View style={styles.container} >
      <TouchableOpacity
          onPress={() => props.navigation.navigate('CardDetailScreen', { id: props.id, deckTitle: props.title })}
          // onPress={() => props.navigation.navigate('AddCard', {id: props.id})}
      >
        <Text style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.description}>
          <Text style={styles.detail}>
            Cards: {props.description}
          </Text>
          {/* <Text style={styles.detail}>
            Create At: {props.createAt}
          </Text> */}
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity
        // onPress={this.onPress}
        >
          <Text style={styles.button}>
            <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-arrow-dropright-circle' : 'md-arrow-dropright-circle'} /> Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddCard', {id: props.id, deckTitle: props.title})}
        >
          <Text style={styles.button}>
            <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} /> Add Card
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={() => showAlert(props.id)}
        >
          <Text style={styles.button}>
            <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'} /> Delete Card
          </Text>
        </TouchableOpacity>
      </View> */}
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
    justifyContent: 'center',
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
  }
});
const mapDispatchToProps = dispatch => {
  return {
    deleteDeck: id => dispatch(removeDeck(id)),
  }
}
export default connect(null, mapDispatchToProps)(DeckCardView)