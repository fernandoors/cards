import { AsyncStorage } from 'react-native'
const DECK_TOKEN = '@DECK_TOKEN'
export const saveDeck = async (id, title) => {
  const deck = JSON.stringify({
    [id]: {
      title,
      id,
      cards: [],
      results: [],
      createAt: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')
    }
  })
  return await AsyncStorage.mergeItem(DECK_TOKEN, deck)
    .then(() => AsyncStorage.getItem(DECK_TOKEN))
    .catch(error => console.log(error))
}
export const saveCard = async (deckId, answer, question) => {
  return await getAllDecks().then(JSON.parse).then(deck => {
    const updateDecks = Array(deck).map(data =>{
      if(data[deckId].id === deckId){
        data[deckId].cards = [...data[deckId].cards, {question, answer}]
      }
      return data
    })
    AsyncStorage.mergeItem(DECK_TOKEN, JSON.stringify(...updateDecks))
      .then(() => AsyncStorage.getItem(DECK_TOKEN))
      .catch(error => console.log(error))
  })
}
export const getAllDecks = async () => {
  return await AsyncStorage.getItem(DECK_TOKEN)
    .catch(error => console.log(error))
}
export const removeDeck = async (id) => {
  return await AsyncStorage.getItem(DECK_TOKEN).then(
    data => {
      const deckRemoved = Object.values(JSON.parse(data)).filter(deck => deck.id !== id)
      AsyncStorage.setItem(DECK_TOKEN, JSON.stringify({ ...deckRemoved }))
    }
  )
    .catch(error => console.log(error))
}

