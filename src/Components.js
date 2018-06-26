import React from "react";

export class JSXHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.change}>
        <label>
          Title:
          <input
            type="text"
            value={this.props.title}
            onChange={this.props.change}
          />
        </label>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    );
  }
}

export const Header = props => {
  return (
    <div>
      <h4 className="display-5">{props.title}</h4>
    </div>
  );
};
