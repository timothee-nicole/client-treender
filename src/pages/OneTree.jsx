import React, { useState, useEffect } from "react";
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
          //   console.log('toto')
          setTree((tree) => {
            return (tree = data);
          });
          setLoading((isLoading) => (isLoading = false));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoading, props.match.params.id, tree]);
  // console.log(tree)

  let currentBasket = props.context.currentBasket;

  function handleOrder() {
    if (!currentBasket && props.context.user) {
      apihandler
        .createOrder({
          basket: [tree._id],
          createdBy: props.context.user._id,
          totalPrice: tree.price,
        })
        .then((data) => {
          props.context.setBasket(data);
          props.context.setUser(props.context.user);
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else if (!props.context.user && !currentBasket) {
      console.log("You Shall Not Pass");
      // create order withoutUser
    } else if (!currentBasket.isCompleted) {
      console.log("You Shall Not Pass");
      currentBasket.basket.push(tree._id);
      // apihandler
      // .editOrder(currentBasket)
      // .then((data) => {
      props.context.setBasket(currentBasket);
      // })
      // .catch((err) => console.log(err))
      // Edit Order
    } else if (currentBasket.isCompleted) {
      console.log("You Shall Not Pass");

      // create new Order
    }
    console.log(currentBasket, tree);
  }

  return (
    <div>
      {/* //   <Item.Group divided>
    //     <Item>
    //       <Item.Image src={tree.picture} alt={tree.name} />
    //       <Item.Content>
    //         <Item.Header as="a">{tree.name}</Item.Header>
    //         <Item.Meta>
    //           <span className="cinema">
    //             {tree.height} | {tree.type} | {tree.age}yo
    //           </span>
    //         </Item.Meta>
    //         <Item.Description>{tree.description}</Item.Description>
    //         <Item.Extra>
    //           <Button primary floated="right" onClick={handleOrder}>
    //             Add {tree.name} to cart
    //             <Icon name="right chevron" />
    //           </Button>
    //         </Item.Extra>
    //       </Item.Content>
    //     </Item> */}{" "}
      <div style={{ border: "3px solid black", display: "flex" }}>
        <img src={tree.picture} alt={tree.name} />{" "}
        <div>
          <h1>{tree.name}</h1>{" "}
          <h3>
            {tree.height} | {tree.type} | {tree.age}yo
          </h3>
          <p>{tree.description}</p>
          <h2>{tree.price} €</h2>
          <button onClick={handleOrder}>Add {tree.name} to cart</button>{" "}
          {/* (1) !user => create order withoutUser
            //             (2) user.Allorder[0] (isCompleted) => create new order with user
            //             (3) user.allOrder[0] !isComleted => edit order and add this tree to the order
            //             (4) user.allOrder.length === 0 => create new Order with user
            //          */}{" "}
          {/* NE PAS SUPPRIMER <Calendar style="border" minDate={Date.now()} maxDate={new Date(Date.now() + 7889400000)} weekStart={1} disabledWeekDays={[0]} /> */}
          {/* //{" "} */}
        </div>{" "}
      </div>
      {/* </Item.Group> */}
    </div>
  );
};

export default withUser(OneTree);
