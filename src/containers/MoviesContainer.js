import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MovieCard from "../components/MovieCard";
import MoviesSearchBar from "../components/MoviesSearchBar";
import SelectableItemsList from "../components/SelectableItemsList";
import { searchMovie, selectMovie } from "../actions/moviesActions";
import { LOCALSTORAGE_MOVIES_STATE } from "../constants";

class MoviesContainer extends React.Component {
  static MAXIMUM_HISTORY_LENGTH = 3;

  constructor(props) {
    super(props);
    this.state = {
      searcherId: this.props.searcherId
    };
    this.handleMovieSelected = this.handleMovieSelected.bind(this);
    this.handleMovieSearched = this.handleMovieSearched.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movies !== this.props.movies) {
      window.localStorage.setItem(
        LOCALSTORAGE_MOVIES_STATE,
        JSON.stringify(this.props.movies)
      );
    }   
  }

  handleMovieSelected(movieId, addToHistory = true) {
    this.props.selectMovie(this.state.searcherId, movieId, addToHistory);
  }

  handleMovieSearched(movieName, movieYear) {
    this.props.searchMovie(this.state.searcherId, movieName, movieYear);
  }

  render() {
    const searcherId = this.state.searcherId;
    let isLoading;
    let moviesData;
    let lastSearchMovies;
    let selectedMovie;

    if (this.props.movies && this.props.movies[searcherId]) {
      isLoading = this.props.movies[searcherId].loading;
      moviesData = this.props.movies[searcherId].moviesData;
      lastSearchMovies = this.props.movies[searcherId].searchHistory && this.props.movies[searcherId].searchHistory.map((movie) => {
        return {
          title: movie.title,
          content: movie.rating,
          image: movie.image,
          id: movie.id
        }
      })

      if (lastSearchMovies && lastSearchMovies.length > MoviesContainer.MAXIMUM_HISTORY_LENGTH) {
        lastSearchMovies = lastSearchMovies.slice(0, MoviesContainer.MAXIMUM_HISTORY_LENGTH);
      }
  
      let selectedMovieId = this.props.movies[searcherId].selectedMovie
      if (selectedMovieId) {
        selectedMovie = this.props.movies[searcherId].searchHistory && this.props.movies[searcherId].searchHistory.filter((movie) => {
          return movie.id === selectedMovieId;
        })[0];

        if (selectedMovie) {
            for(let key in selectedMovie) {
              selectedMovie[key] = selectedMovie[key] || "N/A";
            }
        }
      }
    }

    return (
      <div className={"movie-container"}>
        <h1 className={"text-center"}>Movies !</h1>
        <MoviesSearchBar
          selectMovie={this.handleMovieSelected}
          searchMovie={this.handleMovieSearched}
          movies={moviesData}
          loading={isLoading}
          customClass={"movie-container__movies-search-bar"}
        />
        <SelectableItemsList
          items={lastSearchMovies}
          select={this.handleMovieSelected}
          customClass={"movie-container__selectable-items-list"}
        />
        <MovieCard
          movie={selectedMovie}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectMovie,
      searchMovie
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesContainer);
