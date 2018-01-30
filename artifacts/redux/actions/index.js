/***** action types *****/
export var TypeKeys;
(function (TypeKeys) {
    TypeKeys["ADD_MOVIE"] = "ADD_MOVIE";
    TypeKeys["TOGGLE_MOVIE"] = "TOGGLE_MOVIE";
    TypeKeys["TOGGLE_DISPLAY_COMPLETED"] = "TOGGLE_DISPLAY_COMPLETED";
    TypeKeys["UPDATE_MOVIE"] = "UPDATE_MOVIE";
    TypeKeys["SORT"] = "SORT";
    TypeKeys["LOAD_MOVIES"] = "LOAD_MOVIES";
    TypeKeys["DELETE_MOVIE"] = "DELETE_MOVIE";
})(TypeKeys || (TypeKeys = {}));
/***** actions ******/
export function addMovie(movie) {
    return {
        type: TypeKeys.ADD_MOVIE,
        movie
    };
}
export function updateMovie(movie) {
    return {
        type: TypeKeys.UPDATE_MOVIE,
        movie
    };
}
export function toggleMovie(id) {
    return {
        type: TypeKeys.TOGGLE_MOVIE,
        id
    };
}
export function toggleDisplayCompleted() {
    return {
        type: TypeKeys.TOGGLE_DISPLAY_COMPLETED
    };
}
export function sortMovieList() {
    return {
        type: TypeKeys.SORT
    };
}
export function loadMovies(movieList) {
    return {
        type: TypeKeys.LOAD_MOVIES,
        movieList
    };
}
export function deleteMovie(id) {
    return {
        type: TypeKeys.DELETE_MOVIE,
        id
    };
}
//# sourceMappingURL=index.js.map