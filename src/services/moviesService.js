import { MOVIE_SERVICE_URL, FALLBACK_NO_MOVIE_IMAGE } from "../constants";
class MoviesService {
  find(movieName, movieYear) {
    let searchOptions = "";
    if (movieName) {
      searchOptions += `&t=${movieName}`;
    }

    if (movieYear) {
      searchOptions += `&y=${movieYear}`;
    }
    return new Promise((resolve, reject) => {
      fetch(MOVIE_SERVICE_URL + searchOptions)
        .then(
          response => {
            return response.json();
          },
          error => {
            reject(error);
          }
        )
        .then(response => {
          if (!Array.isArray(response)) {
            response = [response];
          }
          const moviesData = this.mapResponseToMovieData(response);
          resolve(moviesData);
        });
    })
  }

  mapResponseToMovieData(OMDbDataArray) {
    return OMDbDataArray.map((OMDbData) => {
      OMDbData = OMDbData || {};
      return {
        title: OMDbData.Title,
        year: OMDbData.Year,
        id: OMDbData.imdbID,
        length: OMDbData.Runtime,
        image: (OMDbData.Poster !== "N/A" && OMDbData.Poster) || FALLBACK_NO_MOVIE_IMAGE,
        plot: OMDbData.Plot,
        rating: OMDbData.Ratings && OMDbData.Ratings[0] && OMDbData.Ratings[0].Value
      };
    })
  }
}

export const moviesService = new MoviesService();
