import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';

function DeckListItem({ title, questions, navigate }) {
  return (
    <View key={title} style={styles.deckListItem}>
      <TouchableHighlight>
        <View>
          <Text style={styles.deckListItemTitle}>{title}</Text>
          <Text style={styles.deckListItemTitle}>{questions.length} Questions</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

class Decks extends Component {
  state = {
      decks: {}
    }

  componentDidMount() {
    const {dispatch} = this.props;
    
    getDecks()
      .then((results) => dispatch(receiveDecks(results)))
  }

  render() {
    const {decks} = this.props;

    if (Object.keys(decks).length === 0) {
      return (
        <View style={styles.emptySentenceContainer}>
          <Text style={styles.emptySentence}>Add your first deck!</Text>
        </View>
      )
    }

    return (
      <View>
        <FlatList 
          data={Object.values(decks)} 
          renderItem={({ item }) => {
            return <DeckListItem {...item} navigate={this.props.navigation.navigate} />
          }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckListItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  deckListItemTitle: {
    fontSize: 21
  },
  emptySentenceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptySentence: {
    fontSize: 21
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);