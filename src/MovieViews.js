import React from "react";
import InputControl, {
  DisplayAsPills,
  DisplayImageUrl,
  TextAreaControl,
  RadioButtonGroupControl
} from "./InputControls";

export class SearchField extends React.Component {
  render() {
    return (
      <form className="ml-2 mr-2 mb-2">
        <div className="form-group">
          <label htmlFor="searchBox">Filter</label>
          <input
            type="text"
            className="form-control"
            id="searchBox"
            placeholder="enter filter text.."
            defaultValue={this.props.search}
            onChange={this.props.change}
          />
        </div>
      </form>
    );
  }
}

// function component to render title (via props)
export const Header = props => {
  return (
    <div>
      <h4 className="display-5">{props.title}</h4>
    </div>
  );
};

// function component to display list of movies (via props)
export const MovieList = props => {
  return (
    <ul className="list-group-flush">
      {props.movies.map(movie => (
        <li className="list-group-item" key={movie.id}>
          <DisplayMovie movie={movie} deleteHandler={props.deleteHandler} />
        </li>
      ))}
    </ul>
  );
};

// function component to display a movie (via props)
// use destructuring to exract movie prop by name
// avoids having to use props.movie
export const DisplayMovie = ({ movie, deleteHandler }) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {movie.title}{" "}
            <span className="badge badge-pill badge-info">{movie.rating}</span>{" "}
          </h5>
          <DisplayImageUrl url={movie.url} />
          <DisplayAsPills values={movie.genres} />
          <p className="card-text">{movie.description}</p>
        </div>
      </div>
      <button
        className="btn btn-danger mt-3"
        onClick={deleteHandler.bind(this, movie.id)}
      >
        Delete
      </button>
    </div>
  );
};

export class MovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", year: "", budget: "", url: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  resetState() {
    this.setState({
      title: "",
      year: "",
      budget: "",
      url: ""
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.submitHandler(this.state);
    this.resetState();
  }

  handleClear(event) {
    event.preventDefault();
    this.resetState();
    this.props.cancelHandler();
  }

  // requires input control to have a name == state property name
  handleChange(event) {
    // use [] to use value of variable as an object key
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="m-3">
        <form onSubmit={this.handleSubmit}>
          <InputControl
            name="title"
            title="Title"
            value={this.state.title}
            change={this.handleChange}
          />
          <InputControl
            name="year"
            title="Year"
            placeholder="the year.."
            value={this.state.year}
            change={this.handleChange}
          />
          <InputControl
            name="budget"
            title="Budget $"
            placeholder="the $$."
            value={this.state.budget}
            change={this.handleChange}
          />
          <InputControl
            name="url"
            title="Poster Url"
            placeholder="http://.."
            value={this.state.url}
            change={this.handleChange}
          />
          <TextAreaControl
            name="description"
            title="Description"
            type="textarea"
            placeholder=".."
            value={this.state.description}
            change={this.handleChange}
          />

          <RadioButtonGroupControl
            name="rating"
            title="Rating"
            value={1}
            values={[1, 2, 3, 4, 5]}
            change={this.handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button className="btn btn-default" onClick={this.handleClear}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
