import { useState } from "react";
import {Box, Typography } from "@mui/material";
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const minDistance = 1;
export default function Selectbar({
  setFunction1,
  setFunction2,
  minvalue,
  maxvalue,
  text
}) {
  const [value1, setValue1] = useState([minvalue, maxvalue]);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      setFunction1(value1[0]);
      setFunction2(value1[1]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      setFunction1(value1[0]);
      setFunction2(value1[1]);
    }
  };
//Slider 若加上 disableSwap valueLabelDisplay="auto" doesn't work

  return (
    <>
    <Typography gutterBottom sx={{px: 3.8,color:'#908E9B',fontSize: '0.8rem',lineHeight: '1.4375em'}}>{text}</Typography>
    <Box sx={{ width: "100%", px: 3 ,pb:2}}>
      
      <Slider
        value={value1}
        max={maxvalue}
        min={minvalue}
        track="normal"
        marks
        onChange={handleChange1}
        
        valueLabelDisplay="auto" 
  />
      
    </Box>
    </>
  );
}
