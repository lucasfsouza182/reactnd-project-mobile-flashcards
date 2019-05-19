import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { gray } from '../utils/colors';

function DeckItem({ title, questions, navigate }) {
  return (
    <View key={title} style={styles.deckListItem}>
      <TouchableOpacity onPress={() => { navigate('DeckDetail', {title: title}) }}>
        <View>
          <Text style={styles.deckListItemTitle}>{title}</Text>
          <Text style={styles.deckListItemTitle}>{questions.length} Cards</Text>
        </View>
      </TouchableOpacity>
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
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessage}>Add your first deck!</Text>
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={Object.values(decks)}
          keys={Object.keys(decks)}
          renderItem={({ item }) => {
            return <DeckItem {...item} navigate={this.props.navigation.navigate} />
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
    height: 100,
    borderBottomColor: gray,
    borderBottomWidth: 0.5,
  },
  deckListItemTitle: {
    fontSize: 21
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 21
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks);