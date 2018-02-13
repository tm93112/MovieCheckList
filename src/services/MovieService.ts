import axios from 'axios';
import Movie from '../model/Movie';

const MOVIE_SERVER_URL = 'http://192.168.1.10:8080/api/movies';

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
      createdAt: movie.createDate,
      updatedAt: movie.updatedDate
    }).catch((error) => {
      console.log(error);
    });
  },

  update: function(movie: Movie) {
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
      createdAt: movie.createDate,
      updatedAt: movie.updatedDate
    }).catch((error) => {
      console.log(error);
    });
  },

  delete: function(id: string) {
    axios.delete(MOVIE_SERVER_URL + `/${id}`).catch((error) => console.log(error));
  }
}

export default movieService;
