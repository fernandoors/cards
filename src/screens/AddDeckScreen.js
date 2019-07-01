import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import AddDeck from '../components/Decks/AddDeck';

export default function AddDeckScreen({navigation}) {
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <AddDeck navigation={navigation}/>
    </KeyboardAvoidingView>
  );
}

AddDeckScreen.navigationOptions = {
  title: 'Add Deck',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
