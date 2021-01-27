import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import apiHandler from "../../api/apihandler";

class FormUser extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: null,
    isNL: false,
    phoneNumber: "",
    address: {
      city: "",
      zipCode: null,
      street: "",
    },
    agree: false,
  };


  handleChange = (e) => {
    const key = e.target.name;
    const newAddress = { ...this.state.address };

    if (key === "zipCode" || key === "city" || key === "street") {
      newAddress[key] = e.target.value;
      this.setState({
        address: newAddress,
      });
    } else if (key === "isNL" || key === "agree") {
      this.setState({
        [key]: !this.state.key,
      });
    } else {
      this.setState({
        [key]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .signup(this.state)
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ margin: "2%" }}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Last Name"
              name="lastName"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main Street"
            name="street"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" onChange={this.handleChange} placeholder="Paris"/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="number"
              name="zipCode"
              placeholder="75010"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              name="phoneNumber"
              placeholder="01234-555-678"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridNLCheckbox">
          <Form.Check
            type="switch"
            id="custom-NL"
            label="Subscribe to the Newsletter"
            name="isNL"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group id="formGridAgree">
          <Form.Check
            name="agree"
            type="switch"
            id="custom-agree"
            label="I hereby certify that I have read and I agree with the terms of use "
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      
        <h5>
          Already have an account?  <Button onClick={this.props.handleForm} variant="outline-primary">Sign in</Button>
        </h5>
      </Form>
    );
  }
}

export default FormUser;
