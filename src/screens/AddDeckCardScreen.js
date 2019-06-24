import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddDeck from '../components/AddDeck';

export default function DeckCardScreen({navigation}) {
  return (
    <View style={styles.container}>
      <AddDeck navigation={navigation}/>
    </View>
  );
}

DeckCardScreen.navigationOptions = {
  title: 'Add Deck',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
