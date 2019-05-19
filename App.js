import React from 'react';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/Decks';
import DeckDetail from './components/DeckDetail';

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const Tabs = TabNavigator({
  Decks: {
    screen: props => <Decks {...props} />,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: '#757575',
      inactiveTintColor: '#757575',
      style: {
        height: 56,
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  });

  const MainNavigator = StackNavigator({
    Home: {
      screen: Tabs,
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
  
      }
    },
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
