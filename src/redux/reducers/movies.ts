import Movie from '../../model/Movie';
import { TypeKeys } from '../actions';
import { FilterType } from '../../components/FilterForm';

export interface ActionType {
  type: TypeKeys;
  movie?: Movie;
  movieList?: Array<Movie>;
  id?: string;
  filtersToApply?: FilterType
}

export type MovieCheckListState = {
  displayCompleted: boolean;
  movieList: Array<Movie>;
  isLoading: boolean;
  filterIsOpen: boolean;
  filtersToApply: FilterType;
  isErred: boolean;
  randomIsOpen: boolean;
}

const initialState: MovieCheckListState = {
  displayCompleted: false,
  movieList: [],
  isLoading: true,
  filterIsOpen: false,
  filtersToApply: {
    lessThan120MinOnly: false,
    englishOnly: false,
    youngerThan50yrsOnly: false,
    includeComedy: true,
    includeDrama: true,
    includeHorror: true,
    includeAllGenres: true
  },
  isErred: false,
  randomIsOpen: false
}

const movies = (state: MovieCheckListState = initialState, action: ActionType): MovieCheckListState => {
  switch (action.type) {
    case TypeKeys.LOAD_MOVIES:
      return {
        ...state,
        movieList: action.movieList,
        isLoading: false,
        isErred: false
      };
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
      };
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
      };
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
      };
    case TypeKeys.TOGGLE_DISPLAY_COMPLETED:
      return {
        ...state,
        displayCompleted: !state.displayCompleted
      };
    case TypeKeys.SORT:
      return {
        ...state,
        movieList: state.movieList.slice().sort((a: Movie, b: Movie) => compareMovieTitles(a, b))
      };
    case TypeKeys.DELETE_MOVIE:
      return {
        ...state,
        movieList: state.movieList.filter((movie: Movie) => movie.id !== action.id)
      };
    case TypeKeys.TOGGLE_FILTER_MODAL:
      return {
        ...state,
        filterIsOpen: !state.filterIsOpen
      };
    case TypeKeys.UPDATE_FILTER:
      return {
        ...state,
        filtersToApply: action.filtersToApply
      }
    case TypeKeys.TOGGLE_ERROR:
      return {
        ...state,
        isErred: !state.isErred
      }
    case TypeKeys.REFRESH:
      return {
        ...state,
        isLoading: true
      }
    case TypeKeys.TOGGLE_RANDOM_MODAL:
      return {
        ...state,
        randomIsOpen: !state.randomIsOpen
      }
    default:
      return state;
  }
}

function compareMovieTitles(a: Movie, b: Movie): number {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

export default movies;
