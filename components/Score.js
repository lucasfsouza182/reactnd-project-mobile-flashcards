import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { gray, white , purple} from '../utils/colors';
import { clearLocalNotification } from '../utils/notifications';

class Score extends Component {
  constructor(props) {
    super(props);

    this.answers = this.props.navigation.state.params.answers;
    this.goBackToDeckDetail = this.props.navigation.state.params.goBackToDeckDetail;
    this.resetQuiz = this.props.navigation.state.params.resetQuiz;

    this.correctAnswers = this.getCorrectAnswers();
    this.score = this.getScore();
  }

  componentDidMount(){
    clearLocalNotification();
  }

  getScore = () => {
    return ((100 / this.answers.length) * this.correctAnswers).toFixed(0);
  }

  getCorrectAnswers = () =>{
    let counter = 0;
    const answers = this.answers;
    for(let i = 0 ; i < answers.length ; i++){
      if(answers[i] === true) {
        counter++;        
      }
    }
    return counter;
  }

  goBackToDeck = () => {
    this.goBackToDeckDetail();
  }

  restartQuiz = () => {
    this.resetQuiz();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Your score: {this.score}%</Text>
        {this.getCorrectAnswers() / this.answers.length >= 0.5 && 
          <Text style={styles.text}>Congratulations!!</Text>
        }
        {this.getCorrectAnswers() / this.answers.length < 0.5 && 
          <Text style={styles.text}>Wow, try again.</Text>
        }
        <TouchableOpacity style={styles.btn} onPress={() => this.goBackToDeck}>
          <Text style={styles.btnText}>Back to deck</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.correctBtn} onPress={() => this.restartQuiz}>
          <Text style={styles.btnText}>Restart the quiz</Text>
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
  text: {
    fontSize: 21
  },
  btn: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: purple,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    height: 40
  },
  btnText: {
    color: white
  }
});

export default Score;