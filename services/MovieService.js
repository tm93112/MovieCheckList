import Realm from 'realm';
import axios from 'axios';

const MOVIE_SERVER_URL = "http://192.168.1.10:8080/api/movies";

let repository  = new Realm({
  schema: [{
    name: 'Movie',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      title: 'string',
      completed: 'bool',
      imdbURL: 'string?',
      trailerURL: 'string?',
      imdbID: 'string?',
      genres: 'string?[]',
      year: 'string?',
      languages: 'string?[]',
      runTime: 'string?'
    }
  }]
});

let MovieService = {
  findAll: function() {
    const localMovies = repository.objects('Movie');
    return localMovies;
  },

  save: function(movie) {
    repository.write(() => {
      repository.create('Movie', movie);
    });
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
      updatedAt: movie.updatedAt
    });
  },

  update: function(movie) {
    repository.write(() => {
      repository.create('Movie', movie, true);
    });
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
      updatedAt: movie.updatedAt
    }
    );
  },

  delete: function(movie) {
    repository.write(() => {
      repository.delete(movie);
    });
  }
}

export default MovieService;
