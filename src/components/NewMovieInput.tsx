import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addMovie } from '../redux/actions';
import Movie from '../model/Movie';
import MovieService from '../services/MovieService';

export interface Props {
  addMovie: (movie: Movie) => void;
}

export interface State {
  currentValue: string
}

class Input extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      currentValue: ''
    }
  }

  submitMovie = (title: string) => {
    if (!title) {
      return;
    }
    this.setState({
      currentValue: ''
    });
    const movie: Movie = new Movie(title);
    this.props.addMovie(movie);
    MovieService.save(movie);
  }

  onChange = (text) => {
    this.setState({
      currentValue: text
    });
  }

  render() {
    return (
      <View style={style.outerContainer}>
        <View style={style.innerContainer}>
          <TextInput
            onSubmitEditing={(event) => this.submitMovie(event.nativeEvent.text)}
            placeholder='Add a movie...'
            returnKeyType='done'
            autoCorrect={false}
            value={this.state.currentValue}
            onChangeText={(text) => this.onChange(text)}
          />
        </View>
      </View>
    );
  }
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
  }
});

function mapDispatchToProps(dispatch) {
  return {
    addMovie: (movie: Movie) => dispatch(addMovie(movie))
  }
}

const newMovieInput = connect(null, mapDispatchToProps)(Input);

export default newMovieInput;
