import { AsyncStorage } from 'react-native'

export const saveDeck = async (id, title) => {
  const deck = JSON.stringify({
    title,
    id,
    cards: [],
    createAt: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')
  })
  try {
    return await AsyncStorage.setItem('@Deck', deck)
  } catch (error) {
    console.error('erros', error)
  }
};

