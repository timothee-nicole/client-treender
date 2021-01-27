import React, { useEffect } from "react";
import apiHandler from "../api/apihandler";
import { withRouter } from "react-router-dom";

// This component is used to display a list of all trees for our admin to CREATE/EDIT trees.
// This component renders all trees from our tree DB by calling our API Handler that with make the call to the Backend.

const AllTrees = (props) => {
  const [trees, setTrees] = React.useState(null);

  useEffect(() => {
    if (trees === null) {
      // GET to the trees in DB
      apiHandler.getAllTrees("/api/tree/all").then((data) => {
        setTrees((trees) => {
          return (trees = data);
        });
      });
    }
    return () => {};
  }, [trees]);

  function handleDelete(e) {
    e.preventDefault();
    // DELETE the targeted tree
    apiHandler
      .deleteTree(e.target.value)
      .then((data) => {
        setTrees((trees) => {
          return (trees = null);
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <a href="/create-tree">Create Tree</a>
      {trees
        ? trees.map((elem, i) => {
            return (
              <div>
                {elem._id} | {elem.name} | {elem.price}{" "}
                <a href={`/${elem._id}/edit`}>EDIT</a>{" "}
                <button
                  value={elem._id}
                  style={{ color: "red" }}
                  onClick={handleDelete}
                >
                  DELETE
                </button>{" "}
              </div>
            );
          })
        : "content is loading"}
    </div>
  );
};

export default withRouter(AllTrees);
