import React, { Component } from 'react';
import { Results } from 'realm';
import { ScrollView, View, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  toggleMovie,
  toggleDisplayCompleted,
  sortMovieList,
  loadMovies
} from '../redux/actions';
import { MovieCheckListState } from '../redux/reducers/movies';
import { Store } from '../redux/reducers';
import ListItem from './ListItem';
import NewMovieInput from './NewMovieInput';
import Footer from './Footer';
import MovieService from '../services/MovieService';
import Movie, { MovieType } from '../model/Movie';

const MOVIE_SERVER_URL = 'http://192.168.1.10:8080/api/movies';

export interface Props {
  movieList: Array<Movie>;
  onMovieClick: () => void;
  displayCompleted: boolean;
  onShowCompletedClick: () => void;
  sort: () => void;
  load: (movieList: Array<Movie>) => any;
  isLoading: boolean;
}

type OnMovieClickType = (id: string) => void;

class MovieList extends Component<Props, any> {

  renderItem(movie: any, onMovieClick: OnMovieClickType, displayCompleted: boolean, isCompletedList?: boolean) {
    const { item } = movie;
    const styling = isCompletedList ? styles.completedItem : styles.text;
    if ((!item.completed && !isCompletedList) || (item.completed && displayCompleted && isCompletedList)) {
      return(
        <ListItem
          text={item.title}
          onCheck={onMovieClick}
          onTitleClick={() => Actions.editMovie({ movie: item })}
          id={item.id}
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
    axios.get(MOVIE_SERVER_URL, { timeout: 10000 })
      .then((response) => {
        const serverMovies = response.data;
        let ids = [];
        if (serverMovies.length > 0) {
          ids = serverMovies.map((movie: MovieType) => movie.id);
        }
        const localMovies: Results<{}> = MovieService.findAll();
        const newLocal = localMovies.filter((movie: MovieType) => !ids.includes(movie.id));
        movieList = [...new Set([...serverMovies ,...newLocal])];
        load(movieList);
      })
      .catch(() => {
        load(movieList);
      });
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextProps !== nextState) {
      return true;
    }
    return false;
  }

  renderFooter(movieList: Array<Movie>, displayCompleted: boolean,
    onMovieClick: OnMovieClickType, onShowCompletedClick: () => void) {
    let completedMovies = [];
    if (movieList && movieList.length > 0) {
      completedMovies = movieList.filter((movie: MovieType) => movie.completed === true);
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

  showCompletedText : {
    fontSize: 13
  }
});

function mapStateToProps(state: Store) {
  return {
    movieList: state.movies.movieList,
    displayCompleted: state.movies.displayCompleted,
    isLoading: state.movies.isLoading
  };
}

function mapDispatchToProps(dispatch: Dispatch<MovieCheckListState>) {
  return {
    onMovieClick: (id: string) => dispatch(toggleMovie(id)),
    onShowCompletedClick: () => dispatch(toggleDisplayCompleted()),
    sort: () => dispatch(sortMovieList()),
    load: (movieList: Array<Movie>) => dispatch(loadMovies(movieList))
  }
}

const visibleMovieList = connect(mapStateToProps, mapDispatchToProps)(MovieList);

export default visibleMovieList;