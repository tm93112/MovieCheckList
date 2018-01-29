import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addMovie } from '../redux/actions';
import Movie from '../model/Movie';
import MovieService from '../services/MovieService';
class Input extends Component {
    constructor(props) {
        super(props);
        this.submitMovie = (title) => {
            if (!title) {
                return;
            }
            this.setState({
                currentValue: ''
            });
            const movie = new Movie(title);
            this.props.addMovie(movie);
            MovieService.save(movie);
        };
        this.onChange = (text) => {
            this.setState({
                currentValue: text
            });
        };
        this.state = {
            currentValue: ''
        };
    }
    render() {
        return (React.createElement(View, { style: style.outerContainer },
            React.createElement(View, { style: style.innerContainer },
                React.createElement(TextInput, { onSubmitEditing: (event) => this.submitMovie(event.nativeEvent.text), placeholder: 'Add a movie...', returnKeyType: 'done', autoCorrect: false, value: this.state.currentValue, onChangeText: (text) => this.onChange(text) }))));
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
        addMovie: (movie) => dispatch(addMovie(movie))
    };
}
const newMovieInput = connect(null, mapDispatchToProps)(Input);
export default newMovieInput;
//# sourceMappingURL=NewMovieInput.js.map