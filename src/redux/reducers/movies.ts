import Movie from '../../model/Movie';
import { TypeKeys } from '../actions';

export interface ActionType {
  type: TypeKeys;
  movie?: Movie;
  movieList?: Array<Movie>;
  id?: string;
}

export type MovieCheckListState = {
  displayCompleted: boolean;
  movieList: Array<Movie>;
  isLoading: boolean;
}

const initialState: MovieCheckListState = {
  displayCompleted: false,
  movieList: [],
  isLoading: true
}

const movies = (state: MovieCheckListState = initialState, action: ActionType): MovieCheckListState => {
  switch (action.type) {
    case TypeKeys.LOAD_MOVIES:
    return {
      ...state,
      movieList: action.movieList,
      isLoading: false
    }
    case TypeKeys.ADD_MOVIE:
    const newMovie = new Movie(action.movie.title);
    newMovie.id = action.movie.id;
    newMovie.completed = action.movie.completed;
    return {
      ...state,
      movieList: [
        ...state.movieList,
        newMovie
      ]
    }
    case TypeKeys.UPDATE_MOVIE:
      return {
        ...state,
        movieList: [
          ...state.movieList.map(movie =>
            (movie.id === action.movie.id)
            ? {
                ...movie,
                imdbURL: action.movie.imdbURL,
                trailerURL: action.movie.trailerURL,
                title: action.movie.title,
                imdbID: action.movie.omdbData.imdbID,
                omdbData: action.movie.omdbData
              }
            : movie
          )
        ],
        isLoading: true
      }
    case TypeKeys.TOGGLE_MOVIE:
      return {
        ...state,
        movieList:[
          ...state.movieList.map(movie =>
            (movie.id === action.id)
            ? {
                ...movie,
                completed: !movie.completed
              }
            : movie
          )
        ]
      }
    case TypeKeys.TOGGLE_DISPLAY_COMPLETED:
      return {
        ...state,
        displayCompleted: !state.displayCompleted
      }
    case TypeKeys.SORT:
      return {
        ...state,
        movieList: state.movieList.slice().sort((a: Movie, b: Movie) => compare(a, b))
      }
    default:
      return state;
  }
}

function compare(a: Movie, b: Movie): number {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

export default movies;