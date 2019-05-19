import { RECEIVE_DECKS,ADD_DECK,ADD_CARD } from '../actions';

function decks(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      };
    case ADD_CARD:
      console.log("ADD_CARD", action);
      return {
        ...state,
        [action.card.title]: {
          title: action.card.title,
          questions: [
            ...state[action.card.title].questions,
            { question: action.card.question, answer: action.card.answer }
          ]
        }
      };    
		default :
			return state
	}
}

export default decks;