import { ADD_DECK, EDIT_DECK, REMOVE_DECK, ADD_CARD } from '../actions/decks'

export default function decks(state = [], action) {
  switch (action.type) {
    case ADD_DECK:
      return [
        ...state,
        action.deck
        // {
        //   title: action.deck.title,
        //   id: action.deck.id,
        //   cards: action.deck.cards,
        //   createAt: action.deck.createAt,
        // }
      ]
    case EDIT_DECK:
      return [
        ...state,
        action.deck
      ]
    case ADD_CARD:
      const {cardId, question, answer} = action
      const newCard = state.map(deck => {
 
        if(deck.id === action.id){
          deck.cards = [...deck.cards, {id: cardId, question, answer}]
          return deck
        }
        return 
      })
      return newCard
    case REMOVE_DECK:
      return state.filter(deck =>
        deck.id !== action.id
      )
    default:
      return state
  }
}