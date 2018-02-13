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
    TypeKeys["TOGGLE_FILTER_MODAL"] = "TOGGLE_FILTER_MODAL";
    TypeKeys["UPDATE_FILTER"] = "UPDATE_FILTER";
    TypeKeys["TOGGLE_ERROR"] = "TOGGLE_ERROR";
    TypeKeys["REFRESH"] = "REFRESH";
    TypeKeys["TOGGLE_RANDOM_MODAL"] = "TOGGLE_RANDOM_MODAL";
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
export function toggleFilter() {
    return {
        type: TypeKeys.TOGGLE_FILTER_MODAL
    };
}
export function updateFilters(filtersToApply) {
    return {
        type: TypeKeys.UPDATE_FILTER,
        filtersToApply
    };
}
export function toggleError() {
    return {
        type: TypeKeys.TOGGLE_ERROR
    };
}
export function refresh() {
    return {
        type: TypeKeys.REFRESH
    };
}
export function toggleRandom() {
    return {
        type: TypeKeys.TOGGLE_RANDOM_MODAL
    };
}
//# sourceMappingURL=index.js.map