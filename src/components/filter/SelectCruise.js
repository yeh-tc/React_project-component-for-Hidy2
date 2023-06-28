import { Box } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function SelectCruise({setRv}) {
  const handleChange = (event) => {
    setRv(event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <Box sx={{ p: 2 }}>
        <TextField
          sx={{ width: "100%" }}
          select
          label="R/V"
          defaultValue="*"
          size="small"
          onChange={handleChange}
        >
          <MenuItem value="*">All</MenuItem>
          <MenuItem value="OR1">OR1</MenuItem>
          <MenuItem value="OR2">OR2</MenuItem>
          <MenuItem value="OR3">OR3</MenuItem>
        </TextField>
      </Box>
    </>
  );
}
