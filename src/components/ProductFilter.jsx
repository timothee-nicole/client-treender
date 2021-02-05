import React from "react";
import RangeSlider from "./RangeSlider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// This component renders our 3 filter criteria
// 1. THE PRICE RANGE
// 2. THE HEIGHT RANGE
// 3. THE SPECIES OF TREE SELECTED

const treeArr = ["Nordmann", "Epicea", "Nobilis", "Pungens", "Omorika"];
const filteredTreeArr = [];

const useStyles = makeStyles({
  root: {
    width: 300,
    borderBottom: "1px solid lightgrey",
    borderTop: "1px solid lightgrey",
    margin: "15px",
    padding: "15px",
    minHeight: "30px",
  },
});

const ProductFilter = (props) => {
  const [clicked, setClick] = React.useState(false);
  const classes = useStyles();

  function handleChange(e) {
    const valueOneTree = e.target.checked ? e.target.value : e.target.value;
    if (valueOneTree) {
      if (!filteredTreeArr.includes(valueOneTree)) {
        filteredTreeArr.push(valueOneTree);
      } else if (filteredTreeArr.includes(valueOneTree)) {
        let i = filteredTreeArr.indexOf(valueOneTree);
        filteredTreeArr.splice(i, 1);
      }
    }

    // console.log(filteredTreeArr)
    props.onFilter("type", filteredTreeArr);
  }

  const handleClick = () => {
    setClick(!clicked);
  };

//   function resetFilter(e) {
//     console.log("I'M RESETTED");
//     // setFilteringValues({
//     //   price: [],
//     //   height: [],
//     //   type: [],
//     // });
//     // setTreeArrWithFilter(null);
//     ProductFilter.forceUpdate();
//   }

  return (
    <div>
      {/* <button onClick={resetFilter}>Reset Filter</button> */}
      <RangeSlider
        name={"price"}
        min={0}
        max={300}
        rangeMin={0}
        rangeMax={300}
        onFilter={props.onFilter}
      />
      <RangeSlider
        name={"height"}
        min={0}
        max={350}
        rangeMin={0}
        rangeMax={250}
        onFilter={props.onFilter}
      />

      <form className={classes.root}>
        <Typography onClick={handleClick}>
          Species &nbsp;{" "}
          {clicked ? (
            <FontAwesomeIcon icon={faSortUp} />
          ) : (
            <FontAwesomeIcon icon={faSortDown} />
          )}
        </Typography>
        <div
          className={clicked ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {treeArr.map((elem, i) => (
            <div style={{ display: "flex", alignItems: "center" }} key={i}>
              <label htmlFor={elem}>{elem}</label>&nbsp;
              <input
                type="checkbox"
                id={elem}
                name={elem}
                value={elem}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
