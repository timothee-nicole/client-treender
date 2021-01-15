import React from 'react'
import {Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faShoppingCart, faTree, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import withUser from './auth/withUser'
import apiHandler from '../api/apihandler'
// import Badge from '@material-ui/core/Badge';
// import { withStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "../style/nav.css"

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

  // const StyledBadge = withStyles((theme) => ({
  //   badge: {
  //     right: -3,
  //     top: 13,
  //     border: `2px solid ${theme.palette.background.paper}`,
  //     padding: '0 4px',
  //   },
  // }))(Badge);


    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
  <Navbar.Brand href="#home"><img src="./images/logo.png" alt="logo" style={{width: '50px'}} /></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/products"><FontAwesomeIcon icon={faTree}/> Our Products</Nav.Link>
      {props.context.isLoggedIn && props.context.user.isAdmin && <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/all-tree">Trees Admin</NavDropdown.Item>
        <NavDropdown.Item href="/all-orders">Orders Admins</NavDropdown.Item>
        <NavDropdown.Item href="/all-users">Users Admins</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>}
    </Nav>
    <Nav>
      <Nav.Link href="/signin"><FontAwesomeIcon icon={faUserCircle}/> Account</Nav.Link>
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