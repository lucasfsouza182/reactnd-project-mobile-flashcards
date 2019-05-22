import { AsyncStorage } from 'react-native'
export const DECKS_STORAGE_KEY = 'MobileFlashCards:Decks';

function setDummyData(useDummyData) {
  let dummyData = {};
  if(useDummyData){
    dummyData = {
      ['React']: {
        title: 'React',
          questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      ['Javascript']: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      },
    };

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));  
  }

  return dummyData;
}

export function formatResults (results) {
  return results === null
    ? setDummyData(false)
    : JSON.parse(results);
}
