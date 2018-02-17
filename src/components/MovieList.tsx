import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  RefreshControl,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  toggleMovie,
  toggleDisplayCompleted,
  sortMovieList,
  loadMovies,
  toggleError,
  refresh,
  toggleRandom
} from '../redux/actions';
import { MovieCheckListState } from '../redux/reducers/movies';
import { Store } from '../redux/reducers';
import MovieService, { MOVIE_SERVER_URL } from '../services/MovieService';
import ListItem from './ListItem';
import NewMovieInput from './NewMovieInput';
import Footer from './Footer';
import Movie from '../model/Movie';
import FilterForm, { FilterType } from '../components/FilterForm';

export interface Props {
  movieList: Array<Movie>;
  onMovieCheck: (id: string) => void;
  displayCompleted: boolean;
  onShowCompletedClick: () => void;
  sort: () => void;
  load: (movieList: Array<Movie>) => any;
  isLoading: boolean;
  filterIsOpen: boolean;
  filtersToApply: FilterType;
  toggleErr: () => void;
  isErred: boolean;
  reload: () => void;
  randomIsOpen: boolean;
  toggleRandomModal: () => void;
}

export interface State {
  isRefreshing: boolean;
}

type OnMovieCheckType = (id: string) => void;

function MovieList(props) {
  const { movieList, displayCompleted, onMovieCheck, footer, renderItem } = props;
  return(
    <ScrollView
      contentContainerStyle={styles.listContainer}
    >
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

class MovieListContainer extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isRefreshing: false
    }
  }

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

  loadMovies = () => {
    const { load, toggleErr } = this.props;
    axios.get(MOVIE_SERVER_URL, { timeout: 30000 })
      .then((response) => {
        const serverMovies = response.data;
        load(serverMovies);
        this.setState({ isRefreshing: false })
      })
      .catch(() => {
        toggleErr();
      });
  }

  componentDidMount() {
    this.loadMovies();
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (nextProps !== nextState) {
      return true;
    }
    return false;
  }

  tickMovie = (id: string) => {
    this.props.onMovieCheck(id);
    const movieToUpdate = this.props.movieList.find((movie: Movie) => movie.id === id);
    movieToUpdate.completed = true;
    MovieService.update(movieToUpdate);
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

  filterMovies(movieList: Array<Movie>, filtersToApply: FilterType): Array<Movie> {
    const filteredList = movieList.filter((movie: Movie) => {
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
      } else if (movie.genres && movie.genres.length > 0) {
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

  refreshErrorList = () => {
    this.setState({ isRefreshing: true });
    this.props.toggleErr();
    this.loadMovies();
    this.setState({ isRefreshing: false });
  }

  render(){
    const {
      movieList,
      displayCompleted,
      onShowCompletedClick,
      sort,
      isLoading,
      filterIsOpen,
      filtersToApply,
      isErred,
      randomIsOpen,
      toggleRandomModal
    } = this.props;
    const footer = this.renderFooter(movieList, displayCompleted, this.tickMovie, onShowCompletedClick);
    const filteredList = this.filterMovies(movieList, filtersToApply);
    const completedList = filteredList.filter((movie: Movie) => !movie.completed);
    const randomMovie = completedList[Math.floor(Math.random() * (filteredList.length - 1))];
    if (isErred) {
      return(
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.refreshErrorList()}
              refreshing={this.state.isRefreshing}
            />
          }
        >
          <Text>Unable to retrieve movies. Swipe down to refresh.</Text>
        </ScrollView>
      )
    }
    if (isLoading) {
      return(
        <View style={{ flex: 1}}>
          <Text>Loading...</Text>
        </View>
      );
    }
    const randomTitle = randomMovie
      ? (<Text style={{ fontSize: 18 }}>{randomMovie.title}</Text>)
      : undefined;
    return(
      <View style={{ flex: 1 }}>
        <NewMovieInput />
        <MovieList
          movieList={filteredList}
          displayCompleted={displayCompleted}
          onMovieCheck={this.tickMovie}
          footer={footer}
          renderItem={this.renderItem}
        />
        <Modal
          transparent={true}
          visible={filterIsOpen}
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
            <View style={styles.modal}>
              <FilterForm />
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={randomIsOpen}
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
            <View style={styles.randomModal}>
              <Text style={{ fontSize: 24, justifyContent: 'center' }}>The App Has Spoken:</Text>
              {randomTitle}
              <Button
                  title={'Close'}
                  onPress={() => toggleRandomModal()}
              />
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

function mapStateToProps(state: Store) {
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

function mapDispatchToProps(dispatch: Dispatch<MovieCheckListState>) {
  return {
    onMovieCheck: (id: string) => {
      dispatch(toggleMovie(id));
    },
    onShowCompletedClick: () => dispatch(toggleDisplayCompleted()),
    sort: () => dispatch(sortMovieList()),
    load: (movieList: Array<Movie>) => dispatch(loadMovies(movieList)),
    toggleErr: () => dispatch(toggleError()),
    reload: () => dispatch(refresh()),
    toggleRandomModal: () => dispatch(toggleRandom())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
