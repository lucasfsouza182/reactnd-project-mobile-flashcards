import React, { Component } from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as actions from '../actions';
import * as storage from '../utils/api';
import { connect } from 'react-redux';
import { purple , gray, white} from '../utils/colors';

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };
  
  submit = () => {
    if (this.state.question && this.state.answer) {
      const {dispatch, navigation} = this.props;
      const deckTitle = navigation.state.params.deckTitle;

      dispatch(actions.addCard(deckTitle, this.state.question, this.state.answer));
      storage.addCard(deckTitle, this.state.question, this.state.answer)
      .then(() => {
        this.setState({question: '', answer: ''});
        this.props.navigation.navigate('DeckDetail', {title: deckTitle});
      })
    }
    else {
      alert('All fields are required!');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.cardTitleLabel}>Add a new card</Text>
        <TextInput
          value={this.state.question}
          style={styles.cardQuestion}
          placeholder="Question"
          onChangeText={(question) => this.setState({ question })}
        />
        <TextInput
          value={this.state.answer}
          style={styles.cardAnswer}
          placeholder="Answer"
          onChangeText={(answer) => this.setState({ answer })}
        />

        <TouchableOpacity style={styles.addBtn} onPress={this.submit}>
          <Text style={styles.addBtnText}>Submit</Text>
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
  cardTitleLabel: {
    fontSize: 21
  },
  cardQuestion: {
    marginTop: 20,
    fontSize: 21,
    height: 40,
    width: 300,
    borderColor: gray,
    borderWidth: 0
  },
  cardAnswer: {
    marginTop: 20,
    fontSize: 21,
    height: 40,
    width: 300,
    borderColor: gray,
    borderWidth: 0
  },
  addBtn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: purple,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    height: 40
  },
  addBtnText: {
    color: white
  }
});

export default connect()(AddCard);