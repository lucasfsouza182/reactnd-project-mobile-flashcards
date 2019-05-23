import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { gray, white ,green,red} from '../utils/colors';
import { QUESTION,ANSWER } from '../utils/_deck'

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.deck = this.props.navigation.state.params.deck;

    this.state = { 
      index: 0,
      cardSide: QUESTION,
      answers : [],
      buttonDisabled : true
    };
  }

  flipCard = () => {
    this.setState({ cardSide: this.state.cardSide === QUESTION ? ANSWER : QUESTION, buttonDisabled : false });
  }

  resetQuiz = () => {
    this.setState({ index: 0 , responses:[] , cardSide: QUESTION,  buttonDisabled : true });
  }

  answerQuestion = (response) => {
    let answers = this.state.answers;
    answers.push(response);
    this.setState({ answers: answers })

    if((this.state.index + 1) === this.deck.questions.length) {
        return this.props.navigation.navigate("Score", {
          answers: this.state.answers,
          goBackToDeckDetail: () => this.props.navigation.goBack(),
          resetQuiz: () => { this.resetQuiz() }
      });
    }

    this.setState({ index: this.state.index + 1,buttonDisabled : true,cardSide: QUESTION });
  }

  render() {
    const {index ,cardSide,buttonDisabled} = this.state;
    const question = this.deck.questions[index].question;
    const answer = this.deck.questions[index].answer;
    return (
      <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Text style={styles.text}>{cardSide === QUESTION  ? question : answer}</Text>
            <TouchableOpacity onPress={this.flipCard}>
              <Text style={styles.flipBtnText}>Click to show the {cardSide === QUESTION  ? 'question' : 'answer'}</Text>
            </TouchableOpacity>
          </View>
        <TouchableOpacity style={[styles.correctBtn, buttonDisabled ? styles.disabledBtn : styles.enableBtn]} onPress={() => this.answerQuestion(true)} disabled={buttonDisabled}>
          <Text style={styles.correctBtnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.incorrectBtn, buttonDisabled ? styles.disabledBtn : styles.enableBtn]} onPress={() => this.answerQuestion(false)} disabled={buttonDisabled}>
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
    backgroundColor: white,
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
    backgroundColor: green,
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
    backgroundColor: red,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    height: 40
  },
  enableBtn:{
    opacity:1
  },
  disabledBtn:{
    opacity:0.5
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