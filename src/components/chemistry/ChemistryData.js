import { useState} from 'react';
import { Box, Divider } from "@mui/material";
import Scrollbar from "./scrollbar/Scrollbar";
import SelectCruise from './SelectCruise';
import SelectDate from './SelectDate';
import Selectbar from './Selectbar';
import SelectParameter from './SelectParameter';

export default function ChemistryData() {
    
    const [Rv,setRv]=useState('*')
    const [lon, setLon]=useState([106,128]);
    const [lat, setLat]=useState([3,33]);
    const [date, setDate] = useState(['19950520', '20121029'])
    const [parameters, setParameters] = useState(['none'])
  return (
    <div>
      <Box
        position="absolute"
        top="10%"
        sx={{
          zIndex: 1000,
          height: "100%",
          width: "360px",
          backgroundColor: "background.paper",
        }}
      >
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
          <SelectCruise value={Rv} setRv={setRv} />
          <SelectDate setFunction={setDate}/>
          <Selectbar
            value={lat}
            setFunction={setLat}
            minvalue={3}
            maxvalue={33}
            text={"Latitude Range 3 - 33°N"}
          />
          <Selectbar
            value={lon}
            setFunction={setLon}
            minvalue={106}
            maxvalue={128}
            text={"Longitude Range 106 - 128°E"}
          />
          <SelectParameter value={parameters} setFunction={setParameters}/>
          <Divider />
        </Scrollbar>
      </Box>
    </div>
  );
}