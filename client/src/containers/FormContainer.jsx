import React, { Component } from "react";

import CheckBox from "../components/checkbox";
import Input from "../components/input";
import textArea from "../components/textArea";
import Select from "../components/select";
import Button from "../components/button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    // Information we want to record per form instance
    this.state = {
      newUser: {
        name: "",
        age: "",
        emails: "",
        grade: [],
        hear: [],
        about: ""
      },
      // current array options
      emailOptions: ["Yes", "No", "I signed up but haven't received anything"],
      yearOptions: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"],
      hearOptions: [
        "Through a friend",
        "Facebook",
        "Quad day/Business Quad Day",
        "Gies Groups",
        "Other"
      ]
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  // handlers for each type of form component, the way they record data is different
  handleFullName(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: { ...prevState.newUser, name: value }
    }));
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      newUser: { ...prevState.newUser, [name]: value }
    }));
  }

  handleTextArea(e) {
    // console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser,
        about: value
      }
    }));
  }

  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.state.newUser.grade.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.grade.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newUser.grade, newSelection];
    }

    this.setState(prevState => ({
      newUser: { ...prevState.newUser, grade: newSelectionArray }
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;
    // under construction -> currently working on google sheets integration
    fetch("https://api.sheety.co/385b896e-8dcb-453f-99b2-da0c5877ad7a", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userData)
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      });
  }

  // clearing whole form for 'clear' button
  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        name: "",
        netID: "",
        emails: "",
        grade: [],
        hear: [],
        about: ""
      }
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        {/* Using form components to populate container */}
        <Input
          inputType={"text"}
          title={"Full Name"}
          name={"name"}
          value={this.state.newUser.name}
          placeholder={"Enter your name"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"text"}
          name={"netID"}
          title={"Illinois NetID"}
          value={this.state.newUser.netID}
          placeholder={"Enter your Illinois netID"}
          handleChange={this.handleInput}
        />{" "}
        {/* Illinois specific NETID */}
        <Select
          title={"Have you been receiving our emails?"}
          name={"emailOptions"}
          options={this.state.emailOptions}
          value={this.state.newUser.emails}
          handleChange={this.handleInput}
          placeholder={this.state.newUser.emailOptions}
        />{" "}
        {/* Emails Selection */}
        <Select
          title={"How did you hear about MBSA?"}
          name={"hearOptions"}
          options={this.state.hearOptions}
          value={this.state.newUser.hear}
          handleChange={this.handleInput}
          placeholder={this.state.newUser.hearOptions}
        />{" "}
        {/* Receiving emails?*/}
        <CheckBox
          title={"Grade"}
          name={"grade"}
          options={this.state.yearOptions}
          selectedOptions={this.state.newUser.grade}
          handleChange={this.handleCheckBox}
        />{" "}
        {/* Grade */}
        <p>
          <b>Extra Comments</b>
        </p>
        <textArea
          title={"About you."}
          name={"Extra Comments"}
          rows={2}
          cols={90}
          value={this.state.newUser.about}
          name={"currentPetInfo"}
          handleChange={this.handleTextArea}
          placeholder={"Please leave any feedback/questions here!"}
        />{" "}
        <br></br>
        {/* Extra comments */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Clear"}
          style={buttonStyle}
        />{" "}
        {/* Clear the form */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
