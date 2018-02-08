import React, { Component } from 'react';
import { Results } from 'realm';
import { ScrollView, View, TouchableOpacity, FlatList, Text, StyleSheet, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  toggleMovie,
  toggleDisplayCompleted,
  sortMovieList,
  loadMovies,
  toggleFilter
} from '../redux/actions';
import { MovieCheckListState } from '../redux/reducers/movies';
import { Store } from '../redux/reducers';
import ListItem from './ListItem';
import NewMovieInput from './NewMovieInput';
import Footer from './Footer';
import MovieService from '../services/MovieService';
import Movie from '../model/Movie';

const MOVIE_SERVER_URL = 'http://192.168.1.10:8080/api/movies';

export interface Props {
  movieList: Array<Movie>;
  onMovieCheck: () => void;
  displayCompleted: boolean;
  onShowCompletedClick: () => void;
  sort: () => void;
  load: (movieList: Array<Movie>) => any;
  isLoading: boolean;
  filterIsOpen: boolean;
  toggleFilterModal: () => void;
}

type OnMovieCheckType = (id: string) => void;

function MovieList(props) {
  const { movieList, displayCompleted, onMovieCheck, footer, renderItem } = props;
  return(
    <ScrollView contentContainerStyle={styles.listContainer}>
      <FlatList
        data={movieList}
        extraData={displayCompleted}
        keyExtractor={movie => movie.id}
        renderItem={item => renderItem(item, onMovieCheck, displayCompleted)}
        ListFooterComponent={footer}
      />
    </ScrollView>
  );
}

class MovieListContainer extends Component<Props, any> {

  renderItem(movie: any, onMovieCheck: OnMovieCheckType, displayCompleted: boolean, isCompletedList?: boolean) {
    const { item } = movie;
    const styling = isCompletedList ? styles.completedItem : styles.text;
    if ((!item.completed && !isCompletedList) || (item.completed && displayCompleted && isCompletedList)) {
      return(
        <ListItem
          text={item.title}
          onCheck={onMovieCheck}
          onClickEdit={() => Actions.editMovie({ movie: item })}
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
          ids = serverMovies.map((movie: Movie) => movie.id);
        }
        const localMovies: Results<{}> = MovieService.findAll();
        const newLocal = localMovies.filter((movie: Movie) => !ids.includes(movie.id));
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
    onMovieCheck: OnMovieCheckType, onShowCompletedClick: () => void) {
    let completedMovies = [];
    if (movieList && movieList.length > 0) {
      completedMovies = movieList.filter((movie: Movie) => movie.completed === true);
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
            renderItem={item => this.renderItem(item, onMovieCheck, displayCompleted, true)}
          />
        </View>
      )
    }
  }

  render(){
    const {
      movieList,
      onMovieCheck,
      displayCompleted,
      onShowCompletedClick,
      sort,
      isLoading,
      filterIsOpen,
      toggleFilterModal
    } = this.props;
    const footer = this.renderFooter(movieList, displayCompleted, onMovieCheck, onShowCompletedClick);
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
        <MovieList
          movieList={movieList}
          displayCompleted={displayCompleted}
          onMovieCheck={onMovieCheck}
          footer={footer}
          renderItem={this.renderItem}
        />
        <Modal
          transparent={true}
          visible={filterIsOpen}
          onRequestClose={() => toggleFilterModal()}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000080'
            }}
          >
            <View style={{ width: 200, height: 200, backgroundColor: '#ffffff' }}>
              <Text>Test</Text>
            </View>
          </View>
        </Modal>
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
    marginRight: 45,
    marginLeft: 45,
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
    isLoading: state.movies.isLoading,
    filterIsOpen: state.movies.filterIsOpen
  };
}

function mapDispatchToProps(dispatch: Dispatch<MovieCheckListState>) {
  return {
    onMovieCheck: (id: string) => dispatch(toggleMovie(id)),
    onShowCompletedClick: () => dispatch(toggleDisplayCompleted()),
    sort: () => dispatch(sortMovieList()),
    load: (movieList: Array<Movie>) => dispatch(loadMovies(movieList)),
    toggleFilterModal: () => dispatch(toggleFilter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
