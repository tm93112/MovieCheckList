import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMovie } from '../redux/actions';
import Movie from '../model/Movie';
import MovieService from '../services/MovieService';

class Input extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentValue: ''
    }

    this.submitMovie = this.submitMovie.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submitMovie(title) {
    if (!title) {
      return;
    }
    this.setState({
      currentValue: ''
    });
    const movie = new Movie(title);
    this.props.dispatch(addMovie(movie));
    MovieService.save(movie);
  }

  onChange(text) {
    this.setState({
      currentValue: text
    });
  }

  render() {
    return (
      <View style={style.outerContainer}>
        <View style={style.innerContainer}>
          <TextInput
            placeholder="Add a movie..."
            returnKeyType='done'
            autoCorrect={false}
            value={this.state.currentValue}
            onChangeText={(text) => this.setState({ currentValue: text })}
            onSubmitEditing={(event) => this.submitMovie(event.nativeEvent.text)}
            autoGrow={true}
          />
        </View>
      </View>
    );
  }
}

Input.propTypes = {
  dispatch: PropTypes.func
}

const style = StyleSheet.create({
  outerContainer: {
    flex: .12,
    flexDirection: 'column'
  },

  innerContainer: {
    alignItems: 'stretch',
    backgroundColor: '#EBF9FF',
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 3
  },
});

const NewMovieInput = connect()(Input);

export default NewMovieInput;
