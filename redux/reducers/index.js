import { combineReducers } from 'redux';
import routes from './routes';
import movies from './movies';

const movieApp = combineReducers({
  routes,
  movies
});

export default movieApp;
export const getRoutes = ({ routes }) => routes;
export const getMovies = ({ movies }) => movies;
