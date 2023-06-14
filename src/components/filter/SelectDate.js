import {useState} from 'react';
import {Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}
const date1 = dayjs('1985-01-01');
const date2 = dayjs('2020-12-31');
const days = date2.diff(date1, 'month');
console.log(days)
const minDistance = 1;

export default function SelectDate(){
    const [value, setValue] = useState([1,10]);
    const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      }
    };
    return(
    <Box sx={{ pt:2,pl:3, pr:3,pb:2 }}>
    <Typography id="slider-title" gutterBottom> Cruise Date </Typography>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        size="small"
      />
     
    </Box>
    );
}