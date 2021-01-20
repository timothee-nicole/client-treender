import React, { useState, useEffect } from "react";
// import context from "react-bootstrap/esm/AccordionContext";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";
// import { Button, Icon, Image, Item, Label } from "semantic-ui-react";
// import Calendar from 'rc-year-calendar'; /!\ NE PAS SUPPRIMER /!\

const OneTree = (props) => {
  const [tree, setTree] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
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

  function handleOrder() {
    if (props.context.user) {
      if (
        !props.context.user.allOrders.length ||
        props.context.user.allOrders[0].isCompleted
      ) {
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
            apihandler
              .editUser(newUser)
              .then((res) => props.context.setUser(newUser))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
        console.log(props.context.user.allOrders);
      } else if (
        props.context.user.allOrders[0] &&
        !props.context.user.allOrders[0].isCompleted
      ) {
        let copyOfLastBasket = { ...props.context.user.allOrders[0] };
        console.log(copyOfLastBasket);
        if (!copyOfLastBasket.basket.includes(tree._id)) {
          copyOfLastBasket.basket.push(tree._id);
          copyOfLastBasket.totalPrice += tree.price;
        }
        apihandler
          .editOrder(props.context.user.allOrders[0]._id, copyOfLastBasket)
          .then((res) => props.context.setBasket(res))
          .catch((error) => console.log(error));
      }
    }
    // console.log(
    //   1,
    //   !props.context.user.allOrders.length,
    //   2,
    //   !props.context.user.allOrders[0].isCompleted,
    //   3,
    //   props.context.user.allOrders[0].isCompleted
    // );
  }

  // console.log(props.context);
  return (
    <div>
      <div style={{ border: "3px solid black", display: "flex" }}>
        <img src={tree.picture} alt={tree.name} />{" "}
        <div>
          <h1>{tree.name}</h1>{" "}
          <h3>
            {tree.height} | {tree.type} | {tree.age}yo
          </h3>
          <p>{tree.description}</p>
          <h2>{tree.price} €</h2>
          {props.context.user ? (
            <button onClick={handleOrder}>Add {tree.name} to cart</button>
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

export default withUser(OneTree);
