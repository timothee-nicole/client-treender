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

let treeArrwithFilter = [];
const Products = () => {
  const [trees, setTrees] = React.useState(null);
  const [filteringValues, setFilteringValues] = React.useState({
    price: [],
    height: [],
    type: [],
  });

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

  // FILTERING function that takes the values from [ProductCard.jsx] and [RangeSlider.jsx] to render targeted trees
  // in real time
  function handleValues(key, value) {
    const newFilter = { ...filteringValues };
    newFilter[key] = value;
    setFilteringValues((filteringValues) => {
      return (filteringValues = newFilter);
    });
    console.log(filteringValues);
    treeArrwithFilter = trees.filter((obj, j) => {
      if (key === "price" || key === "height") {
        return obj[key] >= newFilter[key][0] && obj[key] <= newFilter[key][1];
      } else {
        return newFilter[key].includes(obj[key]);
      }
    });
    console.log(treeArrwithFilter);
  }

  function applyFilter(e) {
    let price = filteringValues.price
    let height = filteringValues.height
    let type = filteringValues.type
    e.preventDefault();
    // PRICE && HEIGHT
    if (
      price &&
      height &&
      !type
    ) {
    } // PRICE && TYPE
    else if (
      price &&
      !height &&
      type
    ) {
    } // ONLY PRICE
    else if (
      price &&
      !height &&
      !type
    ) {
    } // ONLY HEIGHT
    else if (
      !price &&
      !height &&
      type
    ) {
    } // ONLY TYPE
    else if (
      !price &&
      height &&
      !type
    ) {
    } // HEIGHT && TYPE
    else if (
      !price &&
      height &&
      type
    ) {
    } // PRICE && HEIGHT && TYPE
    else if (
      price &&
      height &&
      type
    ) {
    } // NONE
    else {
    }
  }

  return (
    <div className="product-page">
      <ProductFilter onFilter={handleValues} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {treeArrwithFilter.length ? (
          treeArrwithFilter.map((obj, i) => {
            return <ProductCard tree={obj} key={i} />;
          })
        ) : trees ? (
          trees.map((obj, i) => {
            return <ProductCard tree={obj} key={i} />;
          })
        ) : (
          <div> Content is loading</div>
        )}
        {!treeArrwithFilter ? (trees  ? (
          trees.map((obj, i) => {
            return <ProductCard tree={obj} key={i} />;
          })
        ) : (
          <div> Content is loading</div>
        )) : !treeArrwithFilter.length ? "No Result Found" : treeArrwithFilter.map(blablabla)}
      }
        {}
      </div>
    </div>
  );
};

export default Products;
