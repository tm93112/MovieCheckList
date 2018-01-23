  /***** action types *****/
  export const ADD_MOVIE = 'ADD_MOVIE';
  export const TOGGLE_MOVIE = 'TOGGLE_MOVIE';
  export const TOGGLE_DISPLAY_COMPLETED = 'TOGGLE_DISPLAY_COMPLETED';
  export const UPDATE_MOVIE = 'UPDATE_MOVIE';
  export const SORT = 'SORT';
  export const LOAD_MOVIES = 'LOAD_MOVIES';

  /***** actions ******/
  export function addMovie(movie) {
    return {
      type: ADD_MOVIE,
      movie
    };
  }

  export function updateMovie(movie) {
    return {
      type: UPDATE_MOVIE,
      movie
    };
  }

  export function toggleMovie(id) {
    return {
      type: TOGGLE_MOVIE,
      id
    };
  }

  export function toggleDisplayCompleted() {
    return {
      type: TOGGLE_DISPLAY_COMPLETED
    };
  }

  export function sortMovieList() {
    return{
      type: SORT
    };
  }

  export function loadMovies(movieList) {
    return {
      type: LOAD_MOVIES,
      movieList
    };
  }
