import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import apiHandler from "../api/apihandler";

// Render of PRODUCTS page
// On this page, we will render:
// -the trees from our DB (this time for the user side)
// -the price range input
// -the height range input
// -the checkboxes to select specific type of trees (ie. "Nobilis")

// ALL filters operate together.
// The user can use all 3 filters to target their tree search.

const Products = () => {
  const [trees, setTrees] = React.useState(null);
  const [filteringValues, setFilteringValues] = React.useState({
    price: [],
    height: [],
    type: [],
  });
  const [treeArrwithFilter, setTreeArrWithFilter] = React.useState(null);
  const [id, setId] = React.useState(1);

  console.log(filteringValues);

  useEffect(() => {
    if (trees === null) {
      // GET to render ALL trees from DB by calling API Handler
      apiHandler.getAllTrees("/api/tree/all").then((data) => {
        setTrees((trees) => {
          return (trees = data);
        });
      });
    }
    return () => {};
  }, [trees]);

  // FILTERING function that takes the values from [ProductCard.jsx] and [RangeSlider.jsx]
  // to render targeted trees after applying the filter
  function handleValues(key, value) {
    const newFilter = { ...filteringValues };
    newFilter[key] = value;
    setFilteringValues((filteringValues) => {
      return (filteringValues = newFilter);
    });
  }

  function resetFilter(e) {
    setId(id + 1);
    setTreeArrWithFilter(trees);
  }

  function applyFilter(e) {
    e.preventDefault();
    let price = filteringValues.price;
    let height = filteringValues.height;
    let type = filteringValues.type;
    e.preventDefault();
    // PRICE && HEIGHT
    if (price.length && height.length && !type.length) {
      setTreeArrWithFilter(
        (elem) =>
          (elem = trees.filter((obj, j) => {
            return (
              obj["price"] >= price[0] &&
              obj["price"] <= price[1] &&
              obj["height"] >= height[0] &&
              obj["height"] <= height[1]
            );
          }))
      );
    } // PRICE && TYPE
    else if (price.length && !height.length && type.length) {
      setTreeArrWithFilter(
        (elem) =>
          (elem = trees.filter((obj, j) => {
            return (
              obj["price"] >= price[0] &&
              obj["price"] <= price[1] &&
              type.includes(obj["type"])
            );
          }))
      );
    } // ONLY PRICE
    else if (price.length && !height.length && !type.length) {
      setTreeArrWithFilter(
        (elem) =>
          (elem = trees.filter((obj, j) => {
            return obj["price"] >= price[0] && obj["price"] <= price[1];
          }))
      );
    } // ONLY HEIGHT
    else if (!price.length && height.length && !type.length) {
      setTreeArrWithFilter(
        (elem) =>
          (elem = trees.filter((obj, j) => {
            return obj["height"] >= height[0] && obj["height"] <= height[1];
          }))
      );
    } // ONLY TYPE
    else if (!price.length && !height.length && type.length) {
      setTreeArrWithFilter(
        (elem) =>
          (elem = trees.filter((obj, j) => {
            return type.includes(obj["type"]);
          }))
      );
    } // HEIGHT && TYPE
    else if (!price.length && height.length && type.length) {
      setTreeArrWithFilter(
        (elem) =>
          (elem = trees.filter((obj, j) => {
            return (
              obj["height"] >= height[0] &&
              obj["height"] <= height[1] &&
              type.includes(obj["type"])
            );
          }))
      );
    } // PRICE && HEIGHT && TYPE
    else if (price.length && height.length && type.length) {
      setTreeArrWithFilter(
        (elem) =>
          (elem = trees.filter((obj, j) => {
            return (
              obj["price"] >= price[0] &&
              obj["price"] <= price[1] &&
              obj["height"] >= height[0] &&
              obj["height"] <= height[1] &&
              type.includes(obj["type"])
            );
          }))
      );
    } // NONE
    else {
      setTreeArrWithFilter(trees);
    }
  }

  return (
    <div className="product-page">
      <ProductFilter onFilter={handleValues} key={id} applyFilter={applyFilter} resetFilter={resetFilter}/>
      {/* <button onClick={applyFilter}>Apply Filter</button>
      <button onClick={resetFilter}>Reset Filter</button> */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {!treeArrwithFilter ? (
          trees ? (
            trees.map((obj, i) => {
              return <ProductCard tree={obj} key={i} />;
            })
          ) : (
            <div> Content is loading</div>
          )
        ) : treeArrwithFilter.length > 0 ? (
          treeArrwithFilter.map((obj, i) => {
            return <ProductCard tree={obj} key={i} />;
          })
        ) : (
          "No Results Found ... "
        )}
      </div>
    </div>
  );
};

export default Products;
