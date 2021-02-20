import React, { useState, useEffect } from "react";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Icon } from "semantic-ui-react";
import { Message } from "semantic-ui-react";
// import Calendar from 'rc-year-calendar'; /!\ NE PAS SUPPRIMER /!\

// This component renders the single view page of a selected tree
// This view shows more information about the tree that is not visible on products page card.

const OneTree = (props) => {
  const [tree, setTree] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // GET selected tree details by calling API Handler and then renders data
      apihandler
        .getOneTree(`/api/tree/${props.match.params.id}`)
        .then((data) => {
          setTree((tree) => {
            return (tree = data);
          });
          setLoading((isLoading) => (isLoading = false));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoading, props.match.params.id, tree]);

  // DEPENDING ON IF THIS IS THE FIRST ITEM TO BE ADDED TO CART, WE EITHER CREATE A NEW ORDER AND ADD THIS ITEM TO IT.
  // OR WE EDIT A CURRENT CART BY ADDING THIS ITEM TO IT.

  // CREATING A NEW ORDER
  function createOrder() {
    setAddedToCart((elem) => !elem);
    // Using apiHandler to create a new order in the DB
    apihandler
      .createOrder({
        basket: [tree._id],
        createdBy: props.context.user._id,
        totalPrice: tree.price,
      })
      .then((res) => {
        props.context.setBasket(res);
        let newUser = { ...props.context.user };
        newUser.allOrders.push(res._id);
        // After creation of order in the DB, we update user in DB
        apihandler
          .editUser(newUser)
          .then((res) => {
            // After updating user in DB, we update user's context
            props.context.setUser(newUser);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  // EDITING/UPDATING AN ORDER
  function editOrder() {
    let copyOfLastBasket = props.context.user.allOrders[0];

    if (
      copyOfLastBasket.basket &&
      !copyOfLastBasket.basket.includes(tree._id)
    ) {
      copyOfLastBasket.basket.push(tree._id);
      copyOfLastBasket.totalPrice += tree.price;
    }
    apihandler
      .editOrder(props.context.user.allOrders[0]._id, copyOfLastBasket)
      .then((res) => props.context.setBasket(res))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div style={{ border: "3px solid black", display: "flex" }}>
        <img src={tree.picture} alt={tree.name} />{" "}
        <div>
          <h1>{tree.name}</h1>{" "}
          <h3>
            {tree.height} cm| {tree.type} | {tree.age} yo
          </h3>
          <p>{tree.description}</p>
          <h2>{tree.price} €</h2>
          {/* IF THIS ITEM HAS BEEN ADDED TO THE CURRENT CART AND THE USER'S CONTEXT BASKET CONTAINS THIS ITEM */}
          {/* WE SHOW "ADDED TO CART" LABEL */}
          {/* ELSE IF USER CONTEXT EXISTS AND THIS ITEM HAS NOT BEEN ADDED TO CART */}
          {/* WE THEN RENDER A BUTTON THAT IS LINKED TO CREATING AN ORDER OR EDITING
          AN ORDER DEPENDING ON IF A CART ALREADY EXISTS IF THERE IS NO USER
          CONTEXT, THEN THE USER MUST SIGN IN FIRST BEFORE CONTINUEING */}
          {addedToCart ||
          (props.context.user &&
            props.context.user.allOrders[0] &&
            props.context.user.allOrders[0].basket.includes(
              props.match.params.id
            )) ? (
            <div>
              {" "}
              <Message info>
                <FontAwesomeIcon icon={faCheckCircle} />
                &nbsp; Added to cart
              </Message>
              {/* <FontAwesomeIcon icon={faCheckCircle} /> Added to cart{" "} */}
            </div>
          ) : props.context.user ? (
            props.context.user.allOrders[0] ? (
              <Button
                animated="vertical"
                onClick={editOrder}
                style={{ width: "200px" }}
              >
                <Button.Content hidden>Add {tree.name} to cart</Button.Content>
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
              </Button>
            ) : (
              <Button
                animated="vertical"
                onClick={createOrder}
                style={{ width: "200px" }}
              >
                <Button.Content hidden>Add {tree.name} to cart</Button.Content>
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
              </Button>
            )
          ) : (
            <a href="/account">To create an order, please Sign in first</a>
          )}
          {/* (1) !user => create order withoutUser
            //             (2) user.Allorder[0] (isCompleted) => create new order with user
            //             (3) user.allOrder[0] !isComleted => edit order and add this tree to the order
            //             (4) user.allOrder.length === 0 => create new Order with user
            //          */}{" "}
          {/* NE PAS SUPPRIMER <Calendar style="border" minDate={Date.now()} maxDate={new Date(Date.now() + 7889400000)} weekStart={1} disabledWeekDays={[0]} /> */}
          {/* //{" "} */}
        </div>{" "}
      </div>
    </div>
  );
};

export default withRouter(withUser(OneTree));
