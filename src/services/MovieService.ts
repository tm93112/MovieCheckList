import Realm from 'realm';
import axios from 'axios';
import Movie from '../model/Movie';

const MOVIE_SERVER_URL = 'http://192.168.1.10:8080/api/movies';

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

let movieService = {
  findAll: function() {
    const localMovies = repository.objects('Movie');
    return localMovies;
  },

  save: function(movie: Movie ) {
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
      updatedAt: movie.updatedDate
    });
  },

  update: function(movie: Movie) {
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
      updatedAt: movie.updatedDate
    }
    );
  },

  delete: function(id: string) {
    let movies = repository.objects('Movie');
    let movie = movies.filtered('id = $0', id);
    repository.write(() => {
      repository.delete(movie);
    });
    axios.delete(MOVIE_SERVER_URL + `/${id}`);
  }
}

export default movieService;
