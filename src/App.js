import React from "react";
import { Header, SearchField, MovieList, MovieForm } from "./MovieViews";
import {
  GetMoviesAsync,
  addMovie,
  PostMovieAsync,
  DeleteMovieAsync
} from "./store";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Movie List",
      search: null,
      movies: [],
      displayForm: false
    };
    // important
    this.changeClick = this.changeClick.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  filterMovies() {
    const res =
      this.state.search === null || this.state.search === ""
        ? this.state.movies
        : this.state.movies.filter(movie => {
            return (
              movie.title.toLowerCase().includes(this.state.search) ||
              movie.genres.includes(this.state.search.toUpperCase())
            );
          });
    return res;
  }

  componentDidMount() {
    GetMoviesAsync().then(json => {
      this.setState({ movies: json });
    });
  }

  search(val) {
    console.log(val);
    this.setState({
      search: val
    });
  }

  deleteMovie(id) {
    console.log("deleting", id);
    DeleteMovieAsync(id);
    GetMoviesAsync().then(json => {
      this.setState({ movies: json });
    });
  }

  toggleForm() {
    this.setState({
      ...this.state,
      displayForm: !this.state.displayForm
    });
    console.log("Toggle Form", this.state);
  }

  // handler called by MovieForm child to update parent state
  handleSubmit(data) {
    const m = addMovie(data);
    console.log("Adding movie", m);
    this.setState({
      ...this.state,
      displayForm: false,
      movies: [...this.state.movies, m]
    });
    console.log("Updated Movies", this.state.movies);
    PostMovieAsync(m).then(r => {
      console.log(r);
    });
  }

  changeClick(event) {
    event.preventDefault();
    this.setState({
      search: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-end mr-2">
          <button className="btn btn-primary" onClick={this.toggleForm}>
            Add
          </button>
        </div>

        <Header title={this.state.title} />

        {this.state.displayForm ? (
          <MovieForm
            submitHandler={this.handleSubmit}
            cancelHandler={this.toggleForm}
          />
        ) : (
          <React.Fragment>
            <SearchField search={this.state.search} change={this.changeClick} />
            <MovieList
              movies={this.filterMovies()}
              deleteHandler={this.deleteMovie}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
