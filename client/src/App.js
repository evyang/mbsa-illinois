import React, { Component } from "react";
import FormContainer from "./containers/FormContainer";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6">
        <h3> MBSA Fall Kick-off Check-in </h3>
        <p>
          Welcome to MBSA! If you're new, be sure to check out our website{" "}
          <a href="mbsaillinois.com">here!</a> <br></br>
          If you're interested in getting involved, please fill out our
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSc1oU7qttaGPRWogT_ROYd6RhlX5zRvBI_h_xYDq3Pj5dx5Iw/viewform?usp=sf_link">
            {" "}
            committee preference form
          </a>{" "}
          and join our
          <a href="https://www.facebook.com/groups/510815406335370/">
            {" "}
            facebook group!
          </a>
        </p>
        <br></br>
        <FormContainer />
      </div>
    );
  }
}

export default App;
