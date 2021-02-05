import React, { Component } from "react";
import apiHandler from "../../api/apihandler";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

export default class EditPasswordForm extends Component {
  state = {
    lastPassword: "",
    newPassword: "",
    messageStatus: null,
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
        this.setState({ messageStatus: true });
        setTimeout(() => this.props.passwordStatus(), 4000);
      })
      .catch((err) => {
        this.setState({ messageStatus: false });
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Enter Current Password</h3>
          <input name="lastPassword" onChange={this.handleChange}></input>
          <h3>Enter New Password</h3>
          <input name="newPassword" onChange={this.handleChange}></input>
          <br></br>
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "10px" }}
          >
            CONFIRM
          </Button>
        </form>
        <div>
          {this.state.messageStatus && this.state.messageStatus === true ? (
            <Alert severity="success">Updated Successfully</Alert>
          ) : this.state.messageStatus === false ? (
            <Alert severity="error">...Something went wrong, dude...</Alert>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
