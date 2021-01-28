import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import apihandler from "../api/apihandler";
import { withRouter } from "react-router-dom";

// Array list of our types of trees
const treeArr = ["Nordmann", "Epicea", "Nobilis", "Pungens", "Omorika"];

// This renders the tree form which, depending on the props.action that gets passed ( "CREATE" or "EDIT"),
// will show a blank form or one that contains the current values of the tree

const FormTree = (props) => {
  const [tree, setTree] = useState({});
  const [isLoading, setLoading] = useState(
    props.action === "edit" ? true : false
  );

  const newTree = { ...tree };

  function handleChange(e) {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    const key = e.target.name;
    newTree[key] = value;
    setTree((tree) => (tree = newTree));
  }

  useEffect(() => {
    // We call useEffect() here to get the current tree information if we are editing a tree

    if (isLoading && props.action === "edit") {
      apihandler
        .getOneTree(`/api/tree/${props.id}`)
        .then((data) => {
          setTree((tree) => {
            return (tree = data);
          });
          setLoading((isLoading) => (isLoading = false));
        })
        .catch((err) => console.log(err));
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    // We assemble all our values and append them a FormData() whcih we will send to the DB
    const fd = new FormData();
    for (let key in tree) {
      fd.append(key, tree[key]);
    }

    // Depending on the action (CREATE or EDIT), we call the relevant API Handler to send the data to the DB
    if (props.action === "create") {
      apihandler
        .createTree(fd)
        .then((data) => {
          console.log(data);
          props.history.push("/all-tree");
        })
        .catch((err) => console.log(err));
    } else if (props.action === "edit") {
      apihandler.editTree(props.id, fd).then((data) => {
        console.log(data);
        props.history.push("/");
      });
    }
  }

  return (
    <>
      {" "}
      <Form onSubmit={handleSubmit} action={props.action}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>
            Tree Name{<span style={{ color: "red" }}>*</span>}
          </Form.Label>
          <Form.Control
            type="text"
            value={tree.name ? tree.name : ""}
            placeholder="Jean-Pascal"
            name="name"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Tree Height{<span style={{ color: "red" }}>*</span>}
          </Form.Label>
        </Form.Group>

        <Form.Row>
          <Form.Group>
            <Form.Control
              type="range"
              value={tree.height ? tree.height : ""}
              name="height"
              required
              step={1}
              min={30}
              max={350}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              value={tree.height ? tree.height : ""}
              name="height"
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>
            Tree Price{<span style={{ color: "red" }}>*</span>}
          </Form.Label>
        </Form.Group>

        <Form.Row>
          <Form.Group>
            <Form.Control
              type="range"
              value={tree.price ? tree.price : ""}
              name="price"
              required
              step={1}
              min={30}
              max={350}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              value={tree.price ? tree.price : ""}
              name="price"
              required
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>
            Select pine type{<span style={{ color: "red" }}>*</span>}
          </Form.Label>
          <Form.Control
            as="select"
            value={tree.type ? tree.type : "-1"}
            name="type"
            required
            onChange={handleChange}
          >
            <option disabled value="-1">
              --Please Choose an Option--
            </option>
            {treeArr.map((elem, i) => {
              return (
                <option value={elem} key={i}>
                  {elem}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Age</Form.Label>
          <Form.Control
            as="select"
            name="age"
            value={tree.age ? tree.age : "-1"}
            onChange={handleChange}
          >
            <option disabled value="-1">
              --Please Choose an Option--
            </option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Describe Jean Pascal"
            value={tree.description ? tree.description : ""}
            rows={3}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          {props.action === "edit" && tree.picture ? (
            <img src={tree.picture} alt={tree.name} />
          ) : (
            ""
          )}
          <Form.File
            id="exampleFormControlFile1"
            label="Tree Picture"
            name="picture"
            onChange={handleChange}
          />
        </Form.Group>
        <button>Submit</button>
      </Form>
    </>
  );
};

export default withRouter(FormTree);
