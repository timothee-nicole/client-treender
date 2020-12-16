import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import apiHandler from '../../api/apihandler'
import { UserContext } from '../auth/UserContext';
import {withRouter} from 'react-router-dom'


class FormSignin extends Component {
  static contextType = UserContext

    state = {

    }

    insertGapiScript() {
      const script = document.createElement('script');
      script.src="https://apis.google.com/js/platform.js"

      script.onload = () => {
        this.initializeGoogleSignIn()
      };
      document.body.appendChild(script)
    }

    initializeGoogleSignIn() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '205215776462-pl7bogr9ddsla4pkmqrt7p9mr09anrnk.apps.googleusercontent.com'
        })
        console.log('API inited');

        window.gapi.load('signin2', () => {
          const params = {
            onsuccess: () => {
              console.log("User has finished signin in")
              this.onGoogleSignIn()
            }
          }

          window.gapi.signin2.render('loginButton', params)
        })
      })
    }

    componentDidMount() {
      console.log('Loading...')

      this.insertGapiScript();

      
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

    onGoogleSignIn = (googleUser) => {
      console.log(googleUser)

    }


    render() {
        return (
          <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
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

          <div id="loginButton" style={{margin: "10px"}} data-onsuccess={'this.onGoogleSignIn'}>Signin with Google</div>
          </div>
        )
    }
}

export default withRouter(FormSignin)
