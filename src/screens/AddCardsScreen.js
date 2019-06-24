import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import AddCard from '../components/AddCard';

function AddCardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AddCard navigation={navigation} />
    </View>
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