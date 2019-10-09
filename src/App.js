import React, { Component } from "react";
import "./App.scss";
import MoviesContainer from "./containers/MoviesContainer/MoviesContainer";

class App extends Component {
  render() {
    return (
      <MoviesContainer searcherId={"mainMovieSearcher"}/>
    );
  }
}

export default App;
