import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as storage from '../utils/api';
import { purple , lightPurp, white,gray} from '../utils/colors';

class DeckDetail extends Component {
  state = {
    title: '',
    deck:''
  }

  componentDidMount() {
    const {navigation} = this.props;
    const deckTitle = navigation.state.params.title;

    storage.getDeck(deckTitle)
    .then(deck => {
      this.setState({title: deckTitle,deck: deck});
    })
  }

  addCard = () => {
    this.props.navigation.navigate("AddCard", {deckTitle: this.state.title});
  }

  startQuiz = () => {
    this.props.navigation.navigate("Quiz", {deck: this.state.deck});
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
        <Text style={styles.deckTitle}>{this.state.deck.title}</Text>
        <Text style={styles.deckQuestions}>{this.state.deck.questions.length} cards</Text>
        <TouchableOpacity style={styles.addBtn} onPress={this.addCard}>
          <Text style={styles.addBtnText}>Add card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quizBtn} onPress={this.startQuiz}>
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
  deckTitle: {
    fontSize: 18
  },
  deckQuestions: {
    fontSize: 15,
    color:gray
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