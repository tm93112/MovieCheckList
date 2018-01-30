import Movie from '../../model/Movie';
import { TypeKeys } from '../actions';
const initialState = {
    displayCompleted: false,
    movieList: [],
    isLoading: true
};
const movies = (state = initialState, action) => {
    switch (action.type) {
        case TypeKeys.LOAD_MOVIES:
            return Object.assign({}, state, { movieList: action.movieList, isLoading: false });
        case TypeKeys.ADD_MOVIE:
            const newMovie = new Movie(action.movie.title);
            newMovie.id = action.movie.id;
            newMovie.completed = action.movie.completed;
            return Object.assign({}, state, { movieList: [
                    ...state.movieList,
                    newMovie
                ] });
        case TypeKeys.UPDATE_MOVIE:
            return Object.assign({}, state, { movieList: [
                    ...state.movieList.map(movie => (movie.id === action.movie.id)
                        ? Object.assign({}, movie, { imdbURL: action.movie.imdbURL, trailerURL: action.movie.trailerURL, title: action.movie.title, imdbID: action.movie.omdbData.imdbID, omdbData: action.movie.omdbData }) : movie)
                ], isLoading: true });
        case TypeKeys.TOGGLE_MOVIE:
            return Object.assign({}, state, { movieList: [
                    ...state.movieList.map(movie => (movie.id === action.id)
                        ? Object.assign({}, movie, { completed: !movie.completed }) : movie)
                ] });
        case TypeKeys.TOGGLE_DISPLAY_COMPLETED:
            return Object.assign({}, state, { displayCompleted: !state.displayCompleted });
        case TypeKeys.SORT:
            return Object.assign({}, state, { movieList: state.movieList.slice().sort((a, b) => compare(a, b)) });
        case TypeKeys.DELETE_MOVIE:
            return Object.assign({}, state, { movieList: state.movieList.filter((movie) => movie.id !== action.id) });
        default:
            return state;
    }
};
function compare(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}
export default movies;
//# sourceMappingURL=movies.js.map