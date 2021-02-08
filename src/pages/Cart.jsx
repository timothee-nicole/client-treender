import React from "react";
import { withRouter } from "react-router-dom";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";
import { UserContext } from "../components/auth/UserContext";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Confirm } from "semantic-ui-react";

// This class component renders the user's current cart/basket
// The "editing" process in a simple DELETE button to remove item from cart
// From this page, the user has 3 options:
// 1. DELETE his entire cart (which sets cart quantity to ZERO and takes him back to home page)
// 2. VIEW/EDIT his cart by removing items from list followed by a button to continue his shopping on home page.
// 3. COMPLETE order by checking out which will bring him to the payment transaction page (ie. Stripe) ---more to come

class Cart extends React.Component {
  static contextType = UserContext;
  state = {
    order: null,
    checkout: false,
  };
  
  componentDidMount() {
    if (this.context.user && !this.state.order) {
      apihandler
        .oneOrder(this.context.user.allOrders[0]._id)
        .then((res) => this.setState({ order: res }))
        .catch((error) => console.log(error));
    }
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleCheckout = () => {
    this.setState({ checkout: !this.state.checkout });
  };

  // FUNCTION to delete ONE item from the user's cart
  handleDeleteItem = (targetProduct) => {
    let copyOrder = { ...this.state.order };
    console.log(copyOrder);
    copyOrder.totalPrice -= targetProduct.price;
    let index = copyOrder.basket.findIndex(
      (elem) => elem._id === targetProduct._id
    );
    copyOrder.basket.splice(index, 1);
    console.log(copyOrder.basket);
    apihandler
      .editOrder(this.state.order._id, copyOrder)
      .then((res) => this.setState({ order: copyOrder }))
      .catch((error) => console.log(error));
  };

  // FUNCTION to delete user's cart (Fully)
  handleDeleteCart = (e) => {
    e.preventDefault();
    // APIHANDLER FOR ORDER DELETE
    apihandler
      .deleteOrder(this.context.user.allOrders[0]._id)
      .then((res) => {
        this.setState({ order: null });
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>YOUR CURRENT CART</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.state.order &&
              this.state.order.basket.map((obj, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <h1>{obj.name}</h1>
                    <p>
                      Type: {obj.type} | Size: {obj.height}cm | Age: {obj.age}
                      years old
                    </p>
                  </td>
                  <td>
                    <h3>{obj.price}€</h3>
                  </td>
                  <td onClick={() => this.handleDeleteItem(obj)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan="2">TOTAL PRICE</td>
              <td>
                <strong>
                  {this.state.order && this.state.order.totalPrice}€
                </strong>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant="contained"
          color="default"
          onClick={this.handleCheckout}
        >
          CHECK OUT
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          style={{ textDecoration: "none", color: "white" }}
        >
          <a
            href="/products"
            style={{ textDecoration: "none", color: "white" }}
          >
            CONTINUE SHOPPING
          </a>
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={this.open}
        >
          DELETE ALL ITEMS
        </Button>
        <Confirm
          open={this.state.open}
          onCancel={this.close}
          onConfirm={this.handleDeleteCart}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
    );
  }
}

export default withRouter(withUser(Cart));
