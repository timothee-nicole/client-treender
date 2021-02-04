import React, { Component } from "react";
import apiHandler from "../../api/apihandler";

export default class EditPasswordForm extends Component {
  state = {
    lastPassword: "",
    newPassword: "",
  };

  handleChange = (e) => {
    const key = e.target.name;
    const passwords = { ...this.state };
    passwords[key] = e.target.value;
    console.log(passwords);
    this.setState({
      lastPassword: passwords.lastPassword,
      newPassword: passwords.newPassword,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .editPassword({
        lastPassword: this.state.lastPassword,
        newPassword: this.state.newPassword,
      })
      .then((db) => {
        console.log(db);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button>CONFIRM</button>
          <h3>Enter Current Password</h3>
          <input name="lastPassword" onChange={this.handleChange}></input>
          <h3>Enter New Password</h3>
          <input name="newPassword" onChange={this.handleChange}></input>&nbsp;
        </form>
      </div>
    );
  }
}
