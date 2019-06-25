import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import AddCard from '../components/Cards/AddCard';

function AddCardsScreen({ navigation }) {
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <AddCard navigation={navigation} />
    </KeyboardAvoidingView>
  )
}

AddCardsScreen.navigationOptions = (props) => ({
  title: `${props.navigation.state.params.deckTitle}'s card`,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  return {
    decks: state
  }
}
export default connect(mapStateToProps)(AddCardsScreen) 