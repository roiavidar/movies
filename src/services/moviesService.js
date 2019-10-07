import { MOVIE_SERVICE_URL, FALLBACK_NO_MOVIE_IMAGE } from "../constants";
class MoviesService {
  constructor() {
    this.promises = [];
  }

  find(movieName, movieYear) {
    let searchOptions = "";
    if (movieName) {
      searchOptions += `&t=${movieName}`;
    }

    if (movieYear) {
      searchOptions += `&y=${movieYear}`;
    }
    return new Promise((resolve, reject) => {
      let moviesService = this;
      let index = this.promises.push({ // resolve requests in the order they were sent
        tryToResolve: function() {
            if (this.value && (index === 0 || !moviesService.promises[index - 1])) {
              if (this.isResolved) {
                resolve(this.value);
              } else {
                reject(this.value);
              }   
              moviesService.promises[index] = undefined;
              moviesService.promises[index + 1] && moviesService.promises[index + 1].tryToResolve();
              if (index === moviesService.promises.length - 1) {
                console.log(moviesService.promises);
                moviesService.promises = [];
              }
            }
          }
      }) - 1;

      fetch(MOVIE_SERVICE_URL + searchOptions)
        .then(
          response => {
            return response.json();
          },
          error => {
            this.promises[index].value = error;
            this.promises[index].isResolved = false;
            this.promises[index].tryToResolve();
          }
        )
        .then(response => {
          if (!Array.isArray(response)) {
            response = [response];
          }
          const moviesData = this.mapResponseToMovieData(response);
          this.promises[index].value = moviesData;
          this.promises[index].isResolved = true;
          this.promises[index].tryToResolve();
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
