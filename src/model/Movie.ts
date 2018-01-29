import uuid from '../utils/utils';

export type MovieType = {
  title: string;
  id?: string;
  completed?: boolean;
  trailerURL?: string;
  imdbURL?: string;
  imdbID?: string;
  genres?: Array<string>;
  languages?: Array<string>;
  year?: string;
  runTime?: string;
  omdbData?: OmdbDataType;
}

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
  createDate: Date;
  updatedDate: Date;
  constructor(title: string, id?: string, completed?: boolean,
     trailerURL?: string, omdbData?: OmdbDataType, createDate?: Date, updatedDate?: Date) {
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
