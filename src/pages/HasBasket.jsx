import React, { Component } from "react";
import Cart from "./Cart";
import { UserContext } from "../components/auth/UserContext";
import { Message } from "semantic-ui-react";

class HasBasket extends Component {
  static contextType = UserContext;
  render() {
    return (
      <div>
        {this.context.user && this.context.user.allOrders[0] ? (
          <Cart />
        ) : (
          <Message warning>
            <Message.Header>You currently have no cart!</Message.Header>
            <p>
              Check the <a href="/products">products</a> page to add an item to
              your cart.
            </p>
          </Message>
        )}
      </div>
    );
  }
}

export default HasBasket;
