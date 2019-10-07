import {
  LOAD_CACHED_MOVIES,
  MOVIES_RECIEVED,
  MOVIE_REQUESTED,
  SELECT_MOVIE
} from "../constants";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_REQUESTED: {
      const { searcherId } = action.payload;
      state[searcherId] = state[searcherId] || {};
      state[searcherId].loading = true;

      state[searcherId] = Object.assign({}, state[searcherId]);
      state = Object.assign({}, state);
      break;
    }

    case MOVIES_RECIEVED: {
      const { searcherId, moviesData } = action.payload;
      state[searcherId].moviesData = moviesData;
      state[searcherId].loading = false;

      state[searcherId] = Object.assign({}, state[searcherId]);
      state = Object.assign({}, state);
      break;
    }

    case SELECT_MOVIE: {
      const { searcherId, movieId, addToHistory } = action.payload;
      state[searcherId].selectedMovie = movieId;
      if (addToHistory) {
        const movieData = state[searcherId].moviesData.filter(movie => {
          return movie.id === movieId;
        })[0];
        state[searcherId].searchHistory = state[searcherId].searchHistory || [];
        state[searcherId].searchHistory = [
          movieData,
          ...state[searcherId].searchHistory
        ];
      }
      state[searcherId].movies = [];

      state[searcherId] = Object.assign({}, state[searcherId]);
      state = Object.assign({}, state);
      break;
    }

    case LOAD_CACHED_MOVIES: {
      state = action.payload.cachedMovies;
      state = Object.assign({}, state);
      break;
    }
    default:
      break;
  }
  return state;
};

export default reducer;
