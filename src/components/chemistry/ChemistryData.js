import {Box, Checkbox, FormControlLabel, Slider, Typography, Grid} from "@mui/material";
import Scrollbar from "./scrollbar/Scrollbar";

export default function ChemistryData() {
  const filterContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ margin: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Time span 1995 ~ 2012
        </Typography>
      </Box>
    </Scrollbar>
  );
  return (
    <>
      <Box
        position="absolute"
        top="10%"
        sx={{
          zIndex: 1000,
          maxHeight: "calc(100% - 140px)",
          height: "auto",
          width: "360px",
          backgroundColor: "background.paper",
        }}
      >
        {filterContent}
      </Box>
    </>
  );
}
