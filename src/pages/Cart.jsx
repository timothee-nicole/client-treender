import React from "react";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";
import { UserContext } from "../components/auth/UserContext";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Cart extends React.Component {
  static contextType = UserContext;
  state = {
    order: null,
    checkout: false,
  };
  componentDidMount() {
    apihandler
      .oneOrder(this.context.user.allOrders[0]._id)
      .then((res) => this.setState({ order: res }))
      .catch((error) => console.log(error));
  }

  handleCheckout = () => {
    this.setState({ checkout: !this.state.checkout });
  };

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

  handleDeleteCart = () => {};

  render() {
    console.log(this.state.order);
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
        <button onClick={this.handleCheckout}>CHECK OUT</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/products">CONTINUE SHOPPING</a>
        <button onClick={this.handleDeleteCart}>DELETE ALL ITEMS</button>
      </div>
    );
  }
}

export default withUser(Cart);
