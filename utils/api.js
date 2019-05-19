import { AsyncStorage } from 'react-native'
import { formatResults, DECKS_STORAGE_KEY } from './_deck'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatResults)
}

export function getDeck(key) {
  return this.getDecks()
    .then(decks => {
      console.log("decks AsyncStorage",Object.entries(decks));
      const deck = Object.entries(decks).find(
        res => {
          console.log("decks AsyncStorage res",res[1].title);
          console.log("decks AsyncStorage key",key);
          return res[1].title.toLowerCase() === key.toLowerCase();
        }
      )
      console.log("decks AsyncStorage deck",deck[1]);
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