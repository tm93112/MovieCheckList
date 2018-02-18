import uuid from '../utils/utils';

export type OmdbDataType = {
  imdbURL: string;
  imdbID: string;
  genres: Array<string>;
  languages: Array<string>;
  year: string;
  runTime: string;
}

export default class Movie {
  id: string;
  title: string;
  completed: boolean;
  trailerURL: string;
  omdbData: OmdbDataType;
  imdbURL: string;
  imdbID: string;
  genres: Array<string>;
  languages: Array<string>;
  year: string;
  runTime: string;
  createdAt: any;
  updatedAt: any;
  constructor(title: string, id?: string, completed?: boolean,
     trailerURL?: string, omdbData?: OmdbDataType, createdAt?: Date, updatedAt?: Date) {
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
    if (createdAt) console.log(createdAt);
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
