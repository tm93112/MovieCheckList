import React from 'react';
import { ScrollView, View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  toggleMovie,
  toggleDisplayCompleted,
  sortMovieList,
  loadMovies
} from '../redux/actions';
import ListItem from './ListItem';
import NewMovieInput from './NewMovieInput';
import Footer from './Footer';
import MovieService from '../services/MovieService';
import axios from 'axios';

const MOVIE_SERVER_URL = "http://192.168.1.10:8080/api/movies";

class MovieList extends React.Component {

  renderItem(movie, onMovieClick, displayCompleted, isCompletedList) {
    const { item } = movie;
    const styling = isCompletedList ? styles.completedItem : styles.text;
    if ((!item.completed && !isCompletedList) || (item.completed && displayCompleted && isCompletedList)) {
      return(
        <ListItem
          text={item.title}
          onCheck={onMovieClick}
          onTitleClick={() => Actions.editMovie({ movie: item })}
          id={item.id}
          completed={item.completed}
          styling={styling}
          disabled={item.completed}
          checked={item.completed}
        />
      )
    }
  }

  componentDidMount() {
    const { load } = this.props;
    let movieList = [];
    axios.get(MOVIE_SERVER_URL)
      .then((response) => {
        const serverMovies = response.data;
        let ids = [];
        if (serverMovies.length > 0) {
          ids = serverMovies.map(movie => movie.id);
        }
        const localMovies = MovieService.findAll();
        const newLocal = localMovies.filter(movie => !ids.includes(movie.id));
        movieList = [...new Set([...serverMovies ,...newLocal])];
        load(movieList);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== nextState) {
      return true;
    }
    return false;
  }

  renderFooter(movieList, displayCompleted, onMovieClick, onShowCompletedClick) {
    let completedMovies = false;
    if (movieList && movieList.length > 0) {
      completedMovies = movieList.filter(movie => movie.completed === true);
    }
    if (completedMovies && completedMovies.length > 0) {
      const toggleText = displayCompleted ? `Hide Watched Movies` : `Show Watched Movies`;
      return (
        <View>
          <View style={styles.showCompletedButton}>
            <TouchableOpacity
              style={{ paddingTop: 10 }}
              onPress={onShowCompletedClick}
            >
              <Text style={styles.showCompletedText}>{toggleText}</Text>
            </TouchableOpacity>
          </View>
            <FlatList
              data={completedMovies}
              keyExtractor={movie => movie.id}
              renderItem={item => this.renderItem(item, onMovieClick, displayCompleted, true)}
            />
        </View>
      )
    }
  }

  render(){
    const {
      movieList,
      onMovieClick,
      displayCompleted,
      onShowCompletedClick,
      sort,
      isLoading
    } = this.props;
    const footer = this.renderFooter(movieList, displayCompleted, onMovieClick, onShowCompletedClick);
    if (isLoading) {
      return(
        <View style={{ flex: 1}}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return(
      <View style={{ flex: 1 }}>
        <NewMovieInput />
        <ScrollView contentContainerStyle={styles.listContainer}>
          <FlatList
            data={movieList}
            extraData={displayCompleted}
            keyExtractor={movie => movie.id}
            renderItem={item => this.renderItem(item, onMovieClick, displayCompleted)}
            ListFooterComponent={footer}
          />
        </ScrollView>
        <Footer
          onPress={sort}
        />
      </View>
    );
  }
}

MovieList.propTypes = {
  movieList: PropTypes.array,
  onMovieClick: PropTypes.func,
  displayCompleted: PropTypes.bool,
  onShowCompletedClick: PropTypes.func,
  sort: PropTypes.func
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  completedItem: {
    fontSize: 18,
    textDecorationLine: 'line-through'
  },

  text: {
    fontSize: 18
  },

  showCompletedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF9FF',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: "auto",
    paddingBottom: 10,
    borderRadius: 3
  },

  showCompletedText : {
    fontSize: 13
  },
})

function mapStateToProps(state) {
  return {
    movieList: state.movies.movieList,
    displayCompleted: state.movies.displayCompleted,
    isLoading: state.movies.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMovieClick: id => dispatch(toggleMovie(id)),
    onShowCompletedClick: () => dispatch(toggleDisplayCompleted()),
    sort: () => dispatch(sortMovieList()),
    load: movieList => dispatch(loadMovies(movieList)),
  }
}

const VisibleMovieList = connect(mapStateToProps, mapDispatchToProps)(MovieList);

export default VisibleMovieList;
