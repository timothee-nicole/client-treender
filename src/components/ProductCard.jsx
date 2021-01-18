import React from "react";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";

const ProductCard = (props) => {
  const treeDetails = props.tree;
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={treeDetails.picture} />
      <Card.Body>
        <Card.Title>
          {treeDetails.name}, {treeDetails.age}y.o.
        </Card.Title>
        <Card.Text>{treeDetails.type}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{treeDetails.height} cm</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Text>{treeDetails.description}</Card.Text>
        <Card.Link href={`/product/${treeDetails._id}`}>
          Check out more about {treeDetails.name}
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
