import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { gray, white} from '../utils/colors';

const QUESTION = "QUESTION";
const ANSWER = "ANSWER";

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.deck = this.props.navigation.state.params.deck;

    this.state = { 
      index: 0,
      cardSide: QUESTION,
      answers : [],
      buttonStateHolder : true
    };
  }

  flipCard = () => {
    this.setState({ cardSide: this.state.cardSide === QUESTION ? ANSWER : QUESTION, buttonStateHolder : false });
  }

  resetQuiz = () => {
    this.setState({ index: 0 , responses:[] , cardSide: QUESTION,  buttonStateHolder : true });
  }

  answerQuestion = (response) => {
    let answers = this.state.answers;
    answers.push(response);
    this.setState({ answers: answers })

    if((this.state.index + 1) === this.deck.questions.length) {
      console.log('responses quiz',this.state.answers)
        return this.props.navigation.navigate("Score", {
          answers: this.state.answers,
          goBackToDeckDetail: () => this.props.navigation.goBack(),
          resetQuiz: () => { this.resetQuiz() }
      });
    }

    this.setState({ index: this.state.index + 1,buttonStateHolder : true });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.cardSide === QUESTION &&
          <View style={styles.cardContainer}>
            <Text style={styles.text}>{this.deck.questions[this.state.index].question}</Text>
            <TouchableOpacity onPress={this.flipCard}>
              <Text style={styles.flipBtnText}>Click to show the answer</Text>
            </TouchableOpacity>
          </View>
        }
        {this.state.cardSide === ANSWER &&
          <View style={styles.cardContainer}>
            <Text style={styles.text}>{this.deck.questions[this.state.index].answer}</Text>
            <TouchableOpacity onPress={this.flipCard}>
              <Text style={styles.flipBtnText}>Click to show the question</Text>
            </TouchableOpacity>
          </View>
        }
        <TouchableOpacity style={styles.correctBtn} onPress={() => this.answerQuestion(true)} disabled={this.state.buttonStateHolder}>
          <Text style={styles.correctBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.incorrectBtn} onPress={() => this.answerQuestion(false)} disabled={this.state.buttonStateHolder}>
          <Text style={styles.incorrectBtnText}>Incorrect</Text>
        </TouchableOpacity>
        <Text style={styles.questionLength}>Question {this.state.index + 1} of {this.deck.questions.length}</Text>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    alignItems: "center",
    justifyContent: 'center',
    fontSize: 21
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: 'center'
  },
  flipBtnText: {
    fontSize: 17,
    color: gray
  },
  correctBtn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0da812",
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    height: 40
  },
  correctBtnText: {
    color: white
  },
  incorrectBtn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7160e",
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    height: 40
  },
  incorrectBtnText: {
    color: white
  },
  questionLength: {
    marginTop: 20,
    fontSize: 17
  }
});

export default Quiz