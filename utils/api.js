import { AsyncStorage } from 'react-native'
import { formatResults, DECKS_STORAGE_KEY } from './_deck'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatResults)
}

export function getDeck(key) {
  return this.getDecks()
    .then(decks => {
      const deck = Object.entries(decks).find(
        res => {
          return res[1].title.toLowerCase() === key.toLowerCase();
        }
      )
      return deck[1]
    })
}

export function addDeck(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }));
}

export function addCard(title, question, answer) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const deck = JSON.parse(results)[title];
      
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck.title]: {
          title: deck.title,
          questions: [...deck.questions, { question, answer }]
        }
      }));
    });
}
