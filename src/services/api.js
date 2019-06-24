import { AsyncStorage } from 'react-native'

export const saveDeck = (id, title) => {
  const deck = JSON.stringify({
    title,
    id,
    cards: [],
    createAt: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')
  })
  try {
    const save = AsyncStorage.setItem('@Deck', deck).then(value =>value)
    console.log(save)
    return 
  } catch (error) {
    console.error('erros',error)
  }
};

