import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faShoppingCart,
  faTree,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import withUser from "./auth/withUser";
import apiHandler from "../api/apihandler";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import "../style/nav.css";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: -2,
    border: `2px solid blue`,
    padding: "0 4px",
  },
}))(Badge);

const NavMain = (props) => {
  // const [basketQuantity, setBasketQuantity] = useState(null);

  function handleLogout() {
    apiHandler.logOut().then(props.context.removeUser()).catch();
  }

  // useEffect(() => {
  //   if (
  //     basketQuantity === null &&
  //     props.context.user &&
  //     props.context.user.allOrders[0]
  //   ) {
  //     apiHandler
  //       .oneOrder(props.context.user.allOrders[0]._id)
  //       .then((res) => console.log(res))
  //       .catch((error) => console.log(error));
  //   }
  // }, [basketQuantity]);

  // console.log("FROM NAVMAIN", props.context.user);

  // This NavBar component contains a lot of guards which allow us to show the user the relevant buttons and links.
  // All this in to allow a better UX
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
        <Navbar.Brand href="/">
          <img src="../images/logo.png" alt="logo" style={{ width: "50px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/products">
              <FontAwesomeIcon icon={faTree} /> Our Products
            </Nav.Link>
            {/* IF A USER CONTEXT EXISTS AND THIS USER IS AN ADMIN WE SHOW THE FOLLOWING DROPDOWN MENU */}
            {props.context.isLoggedIn && props.context.user.isAdmin && (
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/all-tree">
                  Trees Admin
                </NavDropdown.Item>
                <NavDropdown.Item href="/all-orders">
                  Orders Admins
                </NavDropdown.Item>
                <NavDropdown.Item href="/all-users">
                  Users Admins
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {/* IF A USER CONTEXT EXISTS WE SEND THE USER TO HIS PROFILE PAGE; IF NOT, HE WILL BE REDIRECTED TO SIGNUP/SIGNIN PAGE */}
            {props.context.user ? (
              <Nav.Link href="/profile">
                <FontAwesomeIcon icon={faUserCircle} /> Profile
              </Nav.Link>
            ) : (
              <Nav.Link href="/account">
                <FontAwesomeIcon icon={faUserCircle} /> Account
              </Nav.Link>
            )}
            {/* IF A USER CONTEXT EXISTS AND THIS USER HAS NO ITEMS IN CART WE ONLY SHOW THE CART ICON */}
            {/* IF THE USER DOES HAVE ITEMS IN THE CART WE SHOW THE CART ICON WITH BADGE INDICATING HOW MANY ITEMS*/}
            {props.context.user && !props.context.user.allOrders[0] ? (
              <Nav.Link eventKey={2} href="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={2} href="/cart">
                <StyledBadge
                  badgeContent={
                    props.context.user && props.context.user.allOrders[0].basket
                      ? props.context.user.allOrders[0].basket.length
                      : 0
                  }
                  color="secondary"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />{" "}
                </StyledBadge>
                &nbsp;
              </Nav.Link>
            )}
            {/* IF A USER CONTEXT EXISTS WE SHOW THE LOGOUT BUTTON */}
            {props.context.isLoggedIn && (
              <Nav.Link onClick={handleLogout} style={{ color: "red" }}>
                <FontAwesomeIcon icon={faPowerOff} /> Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withUser(NavMain);
