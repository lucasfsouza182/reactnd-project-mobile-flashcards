import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as storage from '../utils/api';
import { purple , lightPurp, white} from '../utils/colors';

class DeckDetail extends Component {
  state = {
    title: '',
    deck:''
  }

  componentDidMount() {
    const {navigation} = this.props;
    const deckId = navigation.state.params.title;

    this.state = {
      title: deckId
    }

    storage.getDeck(deckId)
    .then(deck => {
      this.setState({deck: deck});
    })
  }

  addCard = () => {
    this.props.navigation.navigate("AddCard", {deckTitle: this.state.title});
  }

  render() {
    if (!this.state.deck) {
      return (
        <View style={styles.container}>
          <Text>Loading deck...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitleLabel}>{this.state.deck.title}</Text>
        <Text style={styles.deckTitleQuestions}>{this.state.deck.questions.length} cards</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizBtn} >
          <Text style={styles.quizBtnText}>Start quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deckTitleLabel: {
    fontSize: 21
  },
  deckTitleQuestions: {
    fontSize: 21
  },
  addBtn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightPurp,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    height: 40
  },
  addBtnText: {
    color: white
  },
  quizBtn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: purple,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    height: 40
  },
  quizBtnText: {
    color: white
  }
});

export default DeckDetail