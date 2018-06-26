import React from "react";
import { Header, JSXHeader } from "./Components";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "AMC State header"
    };
    // important
    this.changeClick = this.changeClick.bind(this);
  }

  changeClick(event) {
    event.preventDefault();
    this.setState({
      title: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header title={'XXX-'+this.state.title} />
        <JSXHeader title={this.state.title} change={this.changeClick} />
      </React.Fragment>
    );
  }
}
