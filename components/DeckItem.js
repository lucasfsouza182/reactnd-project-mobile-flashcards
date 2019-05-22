import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { gray } from '../utils/colors';


export default class DeckListItem extends Component {

  render() {
    const {item,navigate} = this.props;

    return (
      <View key={item.title} style={styles.deckItem}>
        <TouchableOpacity onPress={() => { navigate('DeckDetail', {title: item.title}) }}>
          <View>
            <Text style={styles.deckTitle}>{item.title}</Text>
            <Text style={styles.deckQuestions}>{item.questions.length} Cards</Text>
          </View>
        </TouchableOpacity>
      </View>
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