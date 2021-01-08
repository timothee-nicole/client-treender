import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import "../style/product-page.css"


const useStyles = makeStyles({
  root: {
    width: 300,
    borderBottom: "1px solid lightgrey",
    borderTop: "1px solid lightgrey",
    margin: "10px",
    padding: "15px",
    minHeight: "30px",
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([props.min, props.max]);
  const [clicked, setClick] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onFilter(props.name, newValue)
  };

  const handleClick = () => {
    setClick(!clicked)
  }

  console.log(clicked)
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom onClick={handleClick} style={{cursor: "pointer"}}>
        {props.name.charAt(0).toUpperCase()}{props.name.slice(1)} Range &nbsp; {clicked ? <FontAwesomeIcon icon={faSortUp}/> : <FontAwesomeIcon icon={faSortDown}/>}
        {/* first letter to uppercase  */}
      </Typography>
      <div
      className={clicked ? "visible" : "hidden"}
      >
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        className={clicked ? "visible" : "hidden"}
        step={10}
        min={props.rangeMin}
        max={props.rangeMax}

      />
      </div>
    </div>
  );
}