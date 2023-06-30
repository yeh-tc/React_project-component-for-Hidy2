import { Typography, Box } from "@mui/material";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

export default function SelectTime({date,setFunction}) {
  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Typography variant="subtitle2" gutterBottom>
        Time Span 1995 ~ 2012
      </Typography>
      <Flatpickr
        className="chemDatePickr"
        options={{
          minDate: "1995-05-20",
          maxDate: "2012-10-29",
          mode: "range",
        }}
      />
    </Box>
  );
}
