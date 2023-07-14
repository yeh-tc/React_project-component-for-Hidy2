import { Typography, Box } from "@mui/material";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const handleIsoString = (dateObj) => {
  dateObj.setTime(dateObj.getTime() + 8 * 3600000)
  return dateObj.toISOString().split('T')[0]
}

export default function SelectDate({setFunction}) {
  
  const handleChange = (newDate) =>{
    if (newDate.length !== 1) {
      const from = handleIsoString(newDate[0])
      const to = handleIsoString(newDate[1])
      setFunction([from, to])
    }
  }

  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Typography variant="subtitle2" gutterBottom>
        Time Span 1995 ~ 2012
      </Typography>
      <Flatpickr
        className="chemDatePickr"
        onChange={handleChange}
        options={{
          minDate: "1995-05-20",
          maxDate: "2012-10-29",
          defaultDate:["1995-05-20","2012-10-29"],
          mode: "range",
        }}
      />
    </Box>
  );
}
