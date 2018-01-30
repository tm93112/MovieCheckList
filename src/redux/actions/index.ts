import Movie from '../../model/Movie';

/***** action types *****/
export enum TypeKeys {
  ADD_MOVIE = 'ADD_MOVIE',
  TOGGLE_MOVIE = 'TOGGLE_MOVIE',
  TOGGLE_DISPLAY_COMPLETED = 'TOGGLE_DISPLAY_COMPLETED',
  UPDATE_MOVIE = 'UPDATE_MOVIE',
  SORT = 'SORT',
  LOAD_MOVIES = 'LOAD_MOVIES',
  DELETE_MOVIE = 'DELETE_MOVIE'
}

export interface AddMovieAction {
  type: TypeKeys.ADD_MOVIE;
  movie: Movie;
}

export interface ToggleMovieAction {
  type: TypeKeys.TOGGLE_MOVIE;
  id: string;
}

export interface ToggleDisplayCompletedAction {
  type: TypeKeys.TOGGLE_DISPLAY_COMPLETED;
}

export interface UpdateMovieAction {
  type: TypeKeys.UPDATE_MOVIE;
  movie: Movie;
}

export interface SortAction {
  type: TypeKeys.SORT;
}

export interface LoadMoviesAction {
  type: TypeKeys.LOAD_MOVIES;
  movieList: Array<Movie>;
}

export interface DeleteMovieAction {
  type: TypeKeys.DELETE_MOVIE;
  id: string;
}

export type ActionTypes =
  | AddMovieAction
  | ToggleMovieAction
  | ToggleDisplayCompletedAction
  | UpdateMovieAction
  | SortAction
  | LoadMoviesAction

/***** actions ******/
export function addMovie(movie: Movie): AddMovieAction {
  return {
    type: TypeKeys.ADD_MOVIE,
    movie
  };
}

export function updateMovie(movie: Movie): UpdateMovieAction {
  return {
    type: TypeKeys.UPDATE_MOVIE,
    movie
  };
}

export function toggleMovie(id: string): ToggleMovieAction {
  return {
    type: TypeKeys.TOGGLE_MOVIE,
    id
  };
}

export function toggleDisplayCompleted(): ToggleDisplayCompletedAction {
  return {
    type: TypeKeys.TOGGLE_DISPLAY_COMPLETED
  };
}

export function sortMovieList(): SortAction {
  return{
    type: TypeKeys.SORT
  };
}

export function loadMovies(movieList: Array<Movie>): LoadMoviesAction {
  return {
    type: TypeKeys.LOAD_MOVIES,
    movieList
  };
}

export function deleteMovie(id: string): DeleteMovieAction {
  return {
    type: TypeKeys.DELETE_MOVIE,
    id
  };
}
