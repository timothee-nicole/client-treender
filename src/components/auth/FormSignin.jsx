import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import apiHandler from '../../api/apihandler'
import { UserContext } from '../auth/UserContext';
import {withRouter} from 'react-router-dom'


class FormSignin extends Component {
  static contextType = UserContext

    state = {

    }

    handleChange = (e) => {
        const key = e.target.name;

            this.setState({
                [key]: e.target.value
            });
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        apiHandler
          .signin(this.state)
          .then((data) => {
            this.context.setUser(data)
            this.props.history.push('/')
          })
          .catch(err => {
            console.log(err)
          })
    }


    render() {
        return (
          <div>
                <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
          </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>

          <button></button>
          </div>
        )
    }
}

export default withRouter(FormSignin)
