import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, FlatList, Text, StyleSheet, Modal, RefreshControl, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import axios from 'axios';
import { toggleMovie, toggleDisplayCompleted, sortMovieList, loadMovies, toggleError, refresh, toggleRandom } from '../redux/actions';
import MovieService from '../services/MovieService';
import ListItem from './ListItem';
import NewMovieInput from './NewMovieInput';
import Footer from './Footer';
import FilterForm from '../components/FilterForm';
const MOVIE_SERVER_URL = 'http://192.168.1.10:8080/api/movies';
function MovieList(props) {
    const { movieList, displayCompleted, onMovieCheck, footer, renderItem } = props;
    return (React.createElement(ScrollView, { contentContainerStyle: styles.listContainer },
        React.createElement(FlatList, { data: movieList, extraData: displayCompleted, keyExtractor: movie => movie.id, renderItem: item => renderItem(item, onMovieCheck, displayCompleted), ListFooterComponent: footer })));
}
class MovieListContainer extends Component {
    constructor(props) {
        super(props);
        this.loadMovies = () => {
            const { load, toggleErr } = this.props;
            axios.get(MOVIE_SERVER_URL, { timeout: 10000 })
                .then((response) => {
                const serverMovies = response.data;
                load(serverMovies);
                this.setState({ isRefreshing: false });
            })
                .catch(() => {
                toggleErr();
            });
        };
        this.tickMovie = (id) => {
            this.props.onMovieCheck(id);
            const movieToUpdate = this.props.movieList.find((movie) => movie.id === id);
            movieToUpdate.completed = true;
            MovieService.update(movieToUpdate);
        };
        this.refreshErrorList = () => {
            this.setState({ isRefreshing: true });
            this.props.toggleErr();
            this.loadMovies();
            this.setState({ isRefreshing: false });
        };
        this.state = {
            isRefreshing: false
        };
    }
    renderItem(movie, onMovieCheck, displayCompleted, isCompletedList) {
        const { item } = movie;
        const styling = isCompletedList ? styles.completedItem : styles.text;
        if ((!item.completed && !isCompletedList) || (item.completed && displayCompleted && isCompletedList)) {
            return (React.createElement(ListItem, { text: item.title, onCheck: onMovieCheck, onClickEdit: () => Actions.editMovie({ movie: item }), id: item.id, styling: styling, disabled: item.completed, checked: item.completed }));
        }
    }
    componentDidMount() {
        this.loadMovies();
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
    filterMovies(movieList, filtersToApply) {
        const filteredList = movieList.filter((movie) => {
            let matchesLanguage = true;
            let matchesLength = true;
            let matchesAge = true;
            let matchesGenre = true;
            if (filtersToApply.englishOnly) {
                if (movie.languages && movie.languages.length > 0 && !movie.languages.includes('English')) {
                    matchesLanguage = false;
                }
            }
            if (filtersToApply.lessThan120MinOnly) {
                if (movie.runTime && Number(movie.runTime) > 120) {
                    matchesLength = false;
                }
            }
            if (filtersToApply.youngerThan50yrsOnly) {
                if (movie.year && ((new Date()).getFullYear() - Number(movie.year) > 50)) {
                    matchesAge = false;
                }
            }
            if (filtersToApply.includeAllGenres) {
                matchesGenre = true;
            }
            else if (movie.genres && movie.genres.length > 0) {
                if (filtersToApply.includeComedy) {
                    if (!movie.genres.includes('Comedy')) {
                        matchesGenre = false;
                    }
                }
                if (filtersToApply.includeDrama) {
                    if (!movie.genres.includes('Drama')) {
                        matchesGenre = false;
                    }
                }
                if (filtersToApply.includeHorror) {
                    if (!movie.genres.includes('Horror')) {
                        matchesGenre = false;
                    }
                }
            }
            return matchesLanguage && matchesLength && matchesAge && matchesGenre;
        });
        return filteredList;
    }
    render() {
        const { movieList, displayCompleted, onShowCompletedClick, sort, isLoading, filterIsOpen, filtersToApply, isErred, randomIsOpen, toggleRandomModal } = this.props;
        const footer = this.renderFooter(movieList, displayCompleted, this.tickMovie, onShowCompletedClick);
        const filteredList = this.filterMovies(movieList, filtersToApply);
        const completedList = filteredList.filter((movie) => !movie.completed);
        const randomMovie = completedList[Math.floor(Math.random() * (filteredList.length - 1))];
        if (isErred) {
            return (React.createElement(ScrollView, { style: { flex: 1 }, refreshControl: React.createElement(RefreshControl, { onRefresh: () => this.refreshErrorList(), refreshing: this.state.isRefreshing }) },
                React.createElement(Text, null, "Unable to retrieve movies. Swipe down to refresh.")));
        }
        if (isLoading) {
            return (React.createElement(View, { style: { flex: 1 } },
                React.createElement(Text, null, "Loading...")));
        }
        const randomTitle = randomMovie
            ? (React.createElement(Text, { style: { fontSize: 18 } }, randomMovie.title))
            : undefined;
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(NewMovieInput, null),
            React.createElement(MovieList, { movieList: filteredList, displayCompleted: displayCompleted, onMovieCheck: this.tickMovie, footer: footer, renderItem: this.renderItem }),
            React.createElement(Modal, { transparent: true, visible: filterIsOpen },
                React.createElement(View, { style: {
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00000080'
                    } },
                    React.createElement(View, { style: styles.modal },
                        React.createElement(FilterForm, null)))),
            React.createElement(Modal, { transparent: true, visible: randomIsOpen },
                React.createElement(View, { style: {
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00000080'
                    } },
                    React.createElement(View, { style: styles.randomModal },
                        React.createElement(Text, { style: { fontSize: 24, justifyContent: 'center' } }, "The App Has Spoken:"),
                        randomTitle,
                        React.createElement(Button, { title: 'Close', onPress: () => toggleRandomModal() })))),
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
        marginRight: 45,
        marginLeft: 45,
        paddingBottom: 10,
        borderRadius: 3
    },
    showCompletedText: {
        fontSize: 13
    },
    modal: {
        width: 300,
        height: 300,
        backgroundColor: '#ffffff',
        padding: 10
    },
    randomModal: {
        width: 300,
        height: 150,
        padding: 10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});
function mapStateToProps(state) {
    return {
        movieList: state.movies.movieList,
        displayCompleted: state.movies.displayCompleted,
        isLoading: state.movies.isLoading,
        filterIsOpen: state.movies.filterIsOpen,
        filtersToApply: state.movies.filtersToApply,
        isErred: state.movies.isErred,
        randomIsOpen: state.movies.randomIsOpen
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onMovieCheck: (id) => {
            dispatch(toggleMovie(id));
        },
        onShowCompletedClick: () => dispatch(toggleDisplayCompleted()),
        sort: () => dispatch(sortMovieList()),
        load: (movieList) => dispatch(loadMovies(movieList)),
        toggleErr: () => dispatch(toggleError()),
        reload: () => dispatch(refresh()),
        toggleRandomModal: () => dispatch(toggleRandom())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
//# sourceMappingURL=MovieList.js.map