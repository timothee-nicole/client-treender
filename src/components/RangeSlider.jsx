import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([props.min, props.max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(props.name, value)
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.name} Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        step={10}
        min={props.rangeMin}
        max={props.rangeMax}

      />
    </div>
  );
}