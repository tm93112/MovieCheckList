import axios from 'axios';
import Movie from '../model/Movie';

export const MOVIE_SERVER_URL = 'http://tmoon.ddns.net:8080/api/movies';

let movieService = {

  save: function(movie: Movie ) {
    axios.post(MOVIE_SERVER_URL, {
      id: movie.id,
      title: movie.title,
      completed: movie.completed,
      imdbURL: movie.imdbURL,
      trailerURL: movie.trailerURL,
      imdbID: movie.imdbID,
      genres: movie.genres,
      year: movie.year,
      languages: movie.languages,
      runTime: movie.runTime,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt
    }).catch((error) => {
      console.log(error);
    });
  },

  update: function(movie: Movie, afterAction?: () => void) {
    axios.put(MOVIE_SERVER_URL + `/${movie.id}`, {
      id: movie.id,
      title: movie.title,
      completed: movie.completed,
      imdbURL: movie.imdbURL,
      trailerURL: movie.trailerURL,
      imdbID: movie.imdbID,
      genres: movie.genres,
      year: movie.year,
      languages: movie.languages,
      runTime: movie.runTime,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt
    })
    .then(() => {
      if (afterAction) {
        afterAction();
      }
    })
    .catch((error) => {
      console.log(error);
      if (afterAction) {
        afterAction();
      }
    });
  },

  delete: function(id: string) {
    axios.delete(MOVIE_SERVER_URL + `/${id}`).catch((error) => console.log(error));
  }
}

export default movieService;
