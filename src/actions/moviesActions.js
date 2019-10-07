import {
  MOVIES_RECIEVED,
  MOVIE_REQUESTED,
  SELECT_MOVIE,
  LOAD_CACHED_MOVIES,
  LOCALSTORAGE_MOVIES_STATE
} from "../constants";
import {moviesService}  from "../services/moviesService";

export function searchMovie(searcherId, movieName, movieYear) {
  return dispatch => {
    dispatch(movieRequested(searcherId));
    return moviesService
      .find(movieName, movieYear)
      .then(response => dispatch(moviesRecieved(searcherId, response)))
  };
}

function moviesRecieved(searcherId, moviesData) {
  return {
    type: MOVIES_RECIEVED,
    payload: { searcherId, moviesData }
  };
}

function movieRequested(searcherId) {
  return {
    type: MOVIE_REQUESTED,
    payload: { searcherId }
  };
}

export function selectMovie(searcherId, movieId, addToHistory = true) {
  return {
    type: SELECT_MOVIE,
    payload: {
      searcherId,
      movieId,
      addToHistory
    }
  };
}

export function loadCachedMovies() {
  let moviesState = window.localStorage.getItem(LOCALSTORAGE_MOVIES_STATE);
  let cachedMovies = moviesState && (JSON.parse(moviesState));

  return {
    type: LOAD_CACHED_MOVIES,
    payload: {
      cachedMovies
    }
  };
}