import {Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
export default function Waiting() {
  return(
    
  <Box
    position="absolute"
    top="50%"
    left="50%"
    sx={{
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress sx={{color:"#EB862F"}} />
  </Box>
  );
}
