import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native';

import DeckCardView from '../components/Common/DeckCardView';
import { EmptyDeck } from '../components/Common/EmptyDeck';
import { handleInitialData } from '../store/actions/decks';
import { setLocalNotification } from '../services/utils';

class HomeScreen extends Component {
  componentDidMount() {
    setLocalNotification()
    this.props.handleInitialData()
  }
  render() {
    const { navigation, decks } = this.props
    return (
      <View style={styles.container}>
        {decks.length > 0
          ? <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            {decks.map((deck) => (
              <DeckCardView
                title={deck.title}
                description={deck.cards.length}
                createAt={deck.createAt}
                key={deck.id}
                id={deck.id}
                navigation={navigation}
              />
            ))}
          </ScrollView>
          : <EmptyDeck navigation={navigation} />
        }
      </View>
    )
  };
}

HomeScreen.navigationOptions = {
  title: 'Home',
};

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
const mapDispatchToProps = dispatch => {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen) 
