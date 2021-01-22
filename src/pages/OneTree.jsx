import React, { useState, useEffect } from "react";
import apihandler from "../api/apihandler";
import withUser from "../components/auth/withUser";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import { Button, Icon, Image, Item, Label } from "semantic-ui-react";
// import Calendar from 'rc-year-calendar'; /!\ NE PAS SUPPRIMER /!\

const OneTree = (props) => {
  const [tree, setTree] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

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

  // function handleOrder() {
  //   // Conditional to check that the user is defined
  //   if (props.context.user) {
  //     // 1. if the user has no order OR the last order has been completed
  //     if (
  //       !props.context.user.allOrders.length ||
  //       props.context.user.allOrders[0].isCompleted
  //     ) {
  //       // if (
  //       //   copyOfLastBasket.basket &&
  //       //   !copyOfLastBasket.basket.includes(tree._id)
  //       // )
  //       apihandler
  //         .createOrder({
  //           basket: [tree._id],
  //           createdBy: props.context.user._id,
  //           totalPrice: tree.price,
  //         })
  //         .then((res) => {
  //           props.context.setBasket(res);
  //           let newUser = { ...props.context.user };
  //           newUser.allOrders.push(res._id);
  //           apihandler
  //             .editUser(newUser)
  //             .then((res) => {
  //               props.context.setUser(newUser);
  //             })
  //             .catch((error) => console.log(error));
  //           props.history.push("/cart");
  //         })
  //         .catch((error) => console.log(error));
  //       console.log(props.context.user.allOrders);
  //       // 2 . the user already has an order but it's not completed
  //     } else if (
  //       props.context.user.allOrders[0] &&
  //       !props.context.user.allOrders[0].isCompleted
  //     ) {
  //       let copyOfLastBasket = props.context.user.allOrders[0];
  //       console.log(copyOfLastBasket);
  //       console.log(props.context.user.allOrders[0]);

  //       if (
  //         copyOfLastBasket.basket &&
  //         !copyOfLastBasket.basket.includes(tree._id)
  //       ) {
  //         copyOfLastBasket.basket.push(tree._id);
  //         copyOfLastBasket.totalPrice += tree.price;
  //       }
  //       apihandler
  //         .editOrder(props.context.user.allOrders[0]._id, copyOfLastBasket)
  //         .then((res) => props.context.setBasket(res))
  //         .catch((error) => console.log(error));
  //     }
  //   }

  // console.log(
  //   1,
  //   !props.context.user.allOrders.length,
  //   2,
  //   !props.context.user.allOrders[0].isCompleted,
  //   3,
  //   props.context.user.allOrders[0].isCompleted
  // );
  // }

  // CREATING A NEW ORDER
  function createOrder() {
    setAddedToCart((elem) => !elem);
    console.log("toto");
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
    // console.log(props.context.user.allOrders);
  }
  function editOrder() {
    console.log("tata");
    let copyOfLastBasket = props.context.user.allOrders[0];
    // console.log(copyOfLastBasket);
    // console.log(props.context.user.allOrders[0]);

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

  // console.log(props.context.currentBasket);
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
          {addedToCart ||
          (props.context.user &&
            props.context.user.allOrders[0] &&
            props.context.user.allOrders[0].basket.includes(
              props.match.params.id
            )) ? (
            <div>
              {" "}
              <FontAwesomeIcon icon={faCheckCircle} /> Added to cart{" "}
            </div>
          ) : props.context.user ? (
            props.context.user.allOrders[0] ? (
              <button onClick={editOrder}>Add {tree.name} to cart</button>
            ) : (
              <button onClick={createOrder}>Add {tree.name} to cart</button>
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
