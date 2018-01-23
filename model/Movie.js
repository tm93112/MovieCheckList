import uuid from '../utils/utils';

class Movie {
  constructor(title, id, completed, trailerURL, omdbData, createDate, updatedDate) {
    this.id = id || uuid();
    this.title = title;
    this.completed = completed || false;
    this.trailerURL = trailerURL || null;
    if (omdbData) {
      this.imdbURL = omdbData.imdbURL || null;
      this.imdbID = omdbData.imdbID || null;
      this.genres = omdbData.genres || null;
      this.languages = omdbData.languages || null;
      this.year = omdbData.year || null;
      this.runTime = omdbData.runTime || null;
    } else {
      this.imdbURL = null;
      this.imdbID = null;
      this.genres = [];
      this.languages = [];
      this.year = null;
      this.runTime = null;
    }
    this.createDate = createDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }
}

export default Movie;
