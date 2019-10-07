import React, { Component } from "react";
import "./App.css";
import MoviesContainer from "../src/containers/MoviesContainer";

class App extends Component {
  render() {
    return (
      <MoviesContainer searcherId={"mainMovieSearcher"}/>
    );
  }
}

export default App;
