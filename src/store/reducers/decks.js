import { ADD_DECK, REMOVE_DECK, ADD_CARD, ADD_RESULT } from '../actions/decks'
let newCard = ''
let newDeck = ''
export default function decks(state = [], action) {
  switch (action.type) {
    case ADD_DECK:
      newDeck = Object.values(JSON.parse(action.deck))
      return newDeck
    case ADD_CARD:
      newDeck = Object.values(JSON.parse(action.deck))
      return newDeck
    case ADD_RESULT:
      newDeck = Object.values(JSON.parse(action.deck))
      return newDeck
    case REMOVE_DECK:
      return state.filter(deck =>
        deck.id !== action.id
      )
    default:
      return state
  }
}