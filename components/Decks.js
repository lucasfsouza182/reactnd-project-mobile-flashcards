import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import DeckItemList from '../components/DeckItem'

class Decks extends Component {
  state = {
      decks: {}
    }

  componentDidMount() {
    const {dispatch} = this.props;
    
    getDecks()
      .then((results) => dispatch(receiveDecks(results)))
  }

  renderItem = ({item}) => {
    return (
      <DeckItemList item={item} navigate={this.props.navigation.navigate}/>
    )
  }

  render() {
    const {decks} = this.props;

    const deckList = Object.entries(decks).map(
      (deck) => {
        return {title: deck[1].title, key: deck[1].title, questions: deck[1].questions}
      }
    )

    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessage}>You are without decks. Add your first deck!</Text>
        </View>
      )
    }

    return (
      <View>
        <FlatList data={deckList} renderItem={this.renderItem}/>
      </View>
    )
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
}

const styles = StyleSheet.create({
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 18
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);