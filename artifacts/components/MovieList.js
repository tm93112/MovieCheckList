import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import { toggleMovie, toggleDisplayCompleted, sortMovieList, loadMovies } from '../redux/actions';
import ListItem from './ListItem';
import NewMovieInput from './NewMovieInput';
import Footer from './Footer';
import MovieService from '../services/MovieService';
const MOVIE_SERVER_URL = 'http://192.168.1.10:8080/api/movies';
class MovieList extends Component {
    renderItem(movie, onMovieCheck, displayCompleted, isCompletedList) {
        const { item } = movie;
        const styling = isCompletedList ? styles.completedItem : styles.text;
        if ((!item.completed && !isCompletedList) || (item.completed && displayCompleted && isCompletedList)) {
            return (React.createElement(ListItem, { text: item.title, onCheck: onMovieCheck, onClickEdit: () => Actions.editMovie({ movie: item }), id: item.id, styling: styling, disabled: item.completed, checked: item.completed }));
        }
    }
    componentDidMount() {
        const { load } = this.props;
        let movieList = [];
        axios.get(MOVIE_SERVER_URL, { timeout: 10000 })
            .then((response) => {
            const serverMovies = response.data;
            let ids = [];
            if (serverMovies.length > 0) {
                ids = serverMovies.map((movie) => movie.id);
            }
            const localMovies = MovieService.findAll();
            const newLocal = localMovies.filter((movie) => !ids.includes(movie.id));
            movieList = [...new Set([...serverMovies, ...newLocal])];
            load(movieList);
        })
            .catch(() => {
            load(movieList);
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps !== nextState) {
            return true;
        }
        return false;
    }
    renderFooter(movieList, displayCompleted, onMovieCheck, onShowCompletedClick) {
        let completedMovies = [];
        if (movieList && movieList.length > 0) {
            completedMovies = movieList.filter((movie) => movie.completed === true);
        }
        if (completedMovies && completedMovies.length > 0) {
            const toggleText = displayCompleted ? `Hide Watched Movies` : `Show Watched Movies`;
            return (React.createElement(View, null,
                React.createElement(View, { style: styles.showCompletedButton },
                    React.createElement(TouchableOpacity, { style: { paddingTop: 10 }, onPress: onShowCompletedClick },
                        React.createElement(Text, { style: styles.showCompletedText }, toggleText))),
                React.createElement(FlatList, { data: completedMovies, keyExtractor: movie => movie.id, renderItem: item => this.renderItem(item, onMovieCheck, displayCompleted, true) })));
        }
    }
    render() {
        const { movieList, onMovieCheck, displayCompleted, onShowCompletedClick, sort, isLoading } = this.props;
        const footer = this.renderFooter(movieList, displayCompleted, onMovieCheck, onShowCompletedClick);
        if (isLoading) {
            return (React.createElement(View, { style: { flex: 1 } },
                React.createElement(Text, null, "Loading...")));
        }
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(NewMovieInput, null),
            React.createElement(ScrollView, { contentContainerStyle: styles.listContainer },
                React.createElement(FlatList, { data: movieList, extraData: displayCompleted, keyExtractor: movie => movie.id, renderItem: item => this.renderItem(item, onMovieCheck, displayCompleted), ListFooterComponent: footer })),
            React.createElement(Footer, { onPress: sort })));
    }
}
const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    completedItem: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        paddingRight: 20
    },
    text: {
        fontSize: 18,
        paddingRight: 20
    },
    showCompletedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF9FF',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 'auto',
        paddingBottom: 10,
        borderRadius: 3
    },
    showCompletedText: {
        fontSize: 13
    }
});
function mapStateToProps(state) {
    return {
        movieList: state.movies.movieList,
        displayCompleted: state.movies.displayCompleted,
        isLoading: state.movies.isLoading
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onMovieCheck: (id) => dispatch(toggleMovie(id)),
        onShowCompletedClick: () => dispatch(toggleDisplayCompleted()),
        sort: () => dispatch(sortMovieList()),
        load: (movieList) => dispatch(loadMovies(movieList))
    };
}
const visibleMovieList = connect(mapStateToProps, mapDispatchToProps)(MovieList);
export default visibleMovieList;
//# sourceMappingURL=MovieList.js.map