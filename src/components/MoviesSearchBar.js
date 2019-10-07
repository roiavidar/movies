import _ from "lodash";
import React, {createRef} from "react";
import { Search, Input, Button } from "semantic-ui-react";

export default class MoviesSearchBar extends React.Component {
  static NO_YEAR = -1;
  static DEBOUNCE_TIMEOUT = 1000;

  constructor(props) {
    super(props);
    this.state = {
      maxYear: new Date().getFullYear(),
      name: '',
      year: MoviesSearchBar.NO_YEAR
    };

    this.searchNameRef = createRef();
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleYearChange = _.debounce(this.handleYearChange.bind(this), MoviesSearchBar.DEBOUNCE_TIMEOUT);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.setFocusToSearch = this.setFocusToSearch.bind(this);
  }

  handleResultSelect(e, { result }) {
    this.props.selectMovie(result.id);
  };

  handleSearchChange() {
      if (this.state.year === MoviesSearchBar.NO_YEAR && this.state.name !== "") {
        this.props.searchMovie(this.state.name);      
      } else if (this.state.name !== "") {
        this.props.searchMovie(this.state.name, this.state.year);    
      }
  };

  handleYearChange(year) {
      this.setState({year}, () => {
        this.handleSearchChange();
      });
  };

  handleNameChange(e, { value }) {
    this.setState({name: value}, () => {
      this.handleSearchChange();
    });
  };

  setFocusToSearch() {
    if (this.state.name !== "") {
      this.searchNameRef.current.open();
    }
  }

  render() {
    const { loading, movies } = this.props;
    let results = [];
    if(movies) {
      results = movies.reduce((movies, movie) => {
        if (movie.title) {
          const plot = movie.plot && movie.plot.substring(0,50) + "...";
          movies.push({
            "title": movie.title,
            "description": plot,
            "image": movie.image,
            "price": movie.rating,
            "id": movie.id
          })
        }
        return movies;
      }, []);
    }

    return (
      <div className={this.props.customClass}>
        <Search
          loading={loading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleNameChange, MoviesSearchBar.DEBOUNCE_TIMEOUT)}
          results={results}
          placeholder="Search by movie name"
          ref={this.searchNameRef}
        />
        <div className={"d-flex"}>
          <Input
            type="number"
            min="1900"
            placeholder="Year"
            max={this.state.maxYear}
            maxLength="4"
            onChange={e => this.handleYearChange(e.target.value)} />
          <Button
            content="Search"
            onClick={this.setFocusToSearch}
            />
        </div>
      </div>
    );
  }
}
