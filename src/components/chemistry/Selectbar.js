import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";

export default function Selectbar({setFunction,value,minvalue,maxvalue,text,
}) {
  const handleChange = (event, newValue) => {
    setFunction(newValue);
  };
  //Slider 若加上 disableSwap valueLabelDisplay="auto" doesn't work

  return (
    <Box sx={{ width: "100%", px: 2, py: 1 }}>
      <Typography gutterBottom variant="subtitle2">
        {text}
      </Typography>
      <Box sx={{ px: 1 }}>
        <Slider
          value={value}
          max={maxvalue}
          min={minvalue}
          track="normal"
          marks
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}
