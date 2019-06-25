import { generateUID } from "../../../services/utils";
import { saveDeck } from "../../services/api";

export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const EDIT_DECK = 'EDIT_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

// ACTIONS 
export const addDeck = (id, title) => { //id, title
  return {
    type: ADD_DECK,
    // deck
    title,
    id,
    cards: [],
    createAt: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')
  }
}

export const editDeck = deck => {
  return {
    type: EDIT_DECK,
    deck
  }
}
export const removeDeck = id => {
  return {
    type: REMOVE_DECK,
    id
  }
}
export const addCard = (id, question, answer) => {
  return {
    type: ADD_CARD,
    cardId: generateUID(),
    id,
    question,
    answer
  }
}

// THUNK

export const handleSaveDeck = (id, title) => {
  return dispatch => {
    saveDeck(id, title)
      .then(deck => console.log(deck))//dispatch(addDeck(deck)))
    // .catch(error => console.error(error))
  }
}