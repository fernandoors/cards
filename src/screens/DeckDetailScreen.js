import React from 'react';
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import DeckDetails from '../components/Decks/DeckDetails';

function DeckDetailScreen({ navigation, decks }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {decks.filter(data => navigation.state.params.id === data.id).map(deck => (
          <DeckDetails
            title={deck.title}
            description={deck.cards.length}
            createAt={deck.createAt}
            results={deck.results}
            key={deck.id}
            id={deck.id}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}

DeckDetailScreen.navigationOptions = (props) => ({
  title: `Deck - ${props.navigation.state.params.deckTitle}`,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

const mapStateToProps = (state) => {
  return {
    decks: state
  }
}
export default connect(mapStateToProps)(DeckDetailScreen) 
