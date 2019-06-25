import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const EmptyDeck = props => {
  return (
    <View style={styles.container}>
      <View style={styles.empty}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddDeckCard')}
        >
          <Text style={styles.emptyText}>
            Add Deck
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: `center`
  },
  emptyText: {
    fontSize: 40,
    color: '#007AFF'
  },
});