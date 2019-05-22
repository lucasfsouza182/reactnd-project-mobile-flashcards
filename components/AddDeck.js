import React, { Component } from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { addDeck } from '../actions';
import * as storage from '../utils/api';
import { connect } from 'react-redux';
import { purple , gray, white} from '../utils/colors';

class AddDeck extends Component {
  state = {
    title: ""
  }

  submit = () => {
    if (this.state.title) {
      const {dispatch} = this.props;

      dispatch(addDeck(this.state.title));
      storage.addDeck(this.state.title);

      this.setState({title: ''});
      this.props.navigation.navigate('DeckDetail', {title: this.state.title});
    }
    else {
      alert('Title field is required!');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitleLabel}>Add a new deck</Text>
        <TextInput
          value={this.state.title}
          style={styles.deckTitle}
          placeholder="Deck title"
          onChangeText={(title) => this.setState({ title })}
        />
        <TouchableOpacity style={styles.addBtn} onPress={this.submit}>
          <Text style={styles.addBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }
}

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deckTitleLabel: {
    fontSize: 21,
    color: gray
  },
  deckTitle: {
    marginTop: 25,
    fontSize: 21,
    height: 40,
    width: 300,
    borderColor: gray,
    borderWidth: 0
  },
  addBtn: {
    marginTop: 25,
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

export default connect()(AddDeck);