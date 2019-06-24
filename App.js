
import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import decks from './src/store/reducers/decks'
import thunk from 'redux-thunk'

const store = createStore(
  decks,
  applyMiddleware(thunk),
)
import AppNavigator from './src/navigation/AppNavigator'

export default function App(props) {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
