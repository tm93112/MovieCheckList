const initialState = {
  displayCompleted: false,
  movieList: [],
  isLoading: true
}

const movies = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_MOVIES':
    return {
      ...state,
      movieList: action.movieList,
      isLoading: false
    }
    case 'ADD_MOVIE':
    return {
      ...state,
      movieList: [
        ...state.movieList,
        {
          id: action.movie.id,
          title: action.movie.title,
          completed: action.movie.completed,
        }
      ]
    }
    case 'UPDATE_MOVIE':
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
    case 'TOGGLE_MOVIE':
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
    case 'TOGGLE_DISPLAY_COMPLETED':
      return {
        ...state,
        displayCompleted: !state.displayCompleted
      }
    case 'SORT':
      return {
        ...state,
        movieList: state.movieList.slice().sort((a,b) => a.title > b.title)
      }
    default:
      return state;
  }
}

export default movies;
