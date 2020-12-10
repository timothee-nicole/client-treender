import React from 'react'
import {Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faShoppingCart, faTree, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import withUser from './auth/withUser'
import apiHandler from '../api/apihandler'

const NavMain = (props) => {
  console.log(props.context.isLoggedIn)

  function handleLogout () {
    apiHandler
      .logOut()
      .then(
        props.context.removeUser()
      )
      .catch((err) => console.log(err))
  }


    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home"><img src="./images/logo.png" alt="logo" style={{width: '50px'}} /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/products"><FontAwesomeIcon icon={faTree}/> Our Products</Nav.Link>
      {props.context.isLoggedIn && props.context.user.isAdmin && <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>}
    </Nav>
    <Nav>
      <Nav.Link href="#deets"><FontAwesomeIcon icon={faUserCircle}/> Account</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
      <FontAwesomeIcon icon={faShoppingCart}/> Cart
      </Nav.Link>

      {props.context.isLoggedIn && <Nav.Link onClick={handleLogout} style={{color: 'red'}}>
      <FontAwesomeIcon icon={faPowerOff} /> Logout
      </Nav.Link>}
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </div>
    )
}

export default withUser(NavMain)