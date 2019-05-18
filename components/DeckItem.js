import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

const DeckItem = function({ title, questions, navigate }){
  return (
    <View key={title} style={styles.deckListItem}>
      <TouchableHighlight onPress={() => { navigate('DeckDetail', {title: title, decksRepository: decksRepository}) }} underlayColor="#999">
        <Text style={styles.deckListItemTitle}>{title} ({questions.length})</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  deckListItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
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

export default DeckItem