import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FormContainer from "./containers/FormContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="col-md-6">
        <h3> MBSA Fall Kick-off Check-in </h3>
        <p>
          Welcome to MBSA! If you're new, be sure to check out our website{" "}
          <a href="mbsaillinois.com">here!</a> <br></br>
          If you're interested in getting involved, please fill out our
          committee preference form and join our Facebook group!
        </p>
        <br></br>
        <FormContainer />
      </div>
    );
  }
}

export default App;
