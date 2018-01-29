import { combineReducers } from 'redux';
import movies, { MovieCheckListState } from './movies';

export type Store = {
  movies: MovieCheckListState;
}

const movieApp = combineReducers({
  movies
});

export default movieApp;
