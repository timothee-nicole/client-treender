import React, { Component } from "react";
import apiHandler from "../../api/apihandler";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { Form } from "react-bootstrap";

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
    console.log("Submitted");
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicCurrPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="lastPassword"
              placeholder="Current Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="outlined"
            color="primary"
            style={{ margin: "10px" }}
            type="submit"
          >
            CONFIRM
          </Button>
        </Form>
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
