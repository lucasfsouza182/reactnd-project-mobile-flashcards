import React, { Component } from 'react';
import { Text, View,StyleSheet, TouchableOpacity,Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { gray } from '../utils/colors';


export default class DeckListItem extends Component {

  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    const { opacity } = this.state;
    const {item} = this.props;
    
    Animated.parallel([
      Animated.timing(opacity, {toValue: 1, delay: item.itemIndex * 100, duration: 1000}),
    ])
    .start()
  }

  render() {
    const {item,navigate} = this.props;
    const {opacity} = this.state;

    return (
      <Animated.View style={{opacity}}>
        <TouchableOpacity style={[styles.deckItem]}onPress={() => { navigate('DeckDetail', {title: item.title}) }}>
          <View>
            <Text style={styles.deckTitle}>{item.title}</Text>
            <Text style={{opacity: .6}}>{item.questions.length} cards</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  deckItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderBottomColor: gray,
    borderBottomWidth: 0.5,
  },
  deckTitle: {
    fontSize: 18,
  },
  deckQuestions: {
    fontSize: 15,
    color:gray
  }
});