import { generateUID } from "../../services/utils";
import { saveDeck, getAllDecks, removeDeck, saveCard } from "../../services/api";

export const ADD_DECK = 'ADD_DECK'
export const EDIT_DECK = 'EDIT_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export const ADD_CARD = 'ADD_CARD'
export const ADD_RESULT = 'ADD_RESULT'
// ACTIONS 
const createAt = new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck
  }
}

export const deleteDeck = id => {
  return {
    type: REMOVE_DECK,
    id
  }
}
export const addCard = (deck) => {
  return {
    type: ADD_CARD,
    deck
  }
}
export const addQuizResult = (id, result) => {
  return {
    type: ADD_RESULT,
    id,
    createAt,
    result
  }
}

// THUNK

export const handleInitialData = () => {
  return dispatch => {
    getAllDecks()
      .then(deck => dispatch(addDeck(deck)))
  }
}
export const handleSaveDeck = (id, title) => {
  return dispatch => {
    saveDeck(id, title)
      .then(deck => dispatch(addDeck(deck)))
      .catch(error => console.error(error))
  }
}
export const handleSaveCard = (deckId, question, answer) => {
  return dispatch => {
    saveCard(deckId, question, answer).then(getAllDecks().then(
      (deck =>  dispatch(addCard(deck))) 
    ))
      // .then(deck =>  console.log(`action`,deck))//dispatch(addCard(deck))) 
      .catch(error => console.error(error))
  }
}
export const handleRemoveDeck = (id) => {
  return dispatch => {
    removeDeck(id).then(() => dispatch(deleteDeck(id)))
      .catch(error => console.error(error))
  }
}