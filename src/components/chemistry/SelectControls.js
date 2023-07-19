import SelectCruise from "./SelectCruise";
import SelectDate from "./SelectDate";
import Selectbar from "./Selectbar";
import SelectParameter from "./SelectParameter";

export default function SelectControl({ setRv, setDate, setLat, setLon, parameters, setParameters }){
return(
    <>
    <SelectCruise setRv={setRv} />
    <SelectDate setFunction={setDate} />
    <Selectbar
      value={[3, 33]}
      setFunction={setLat}
      minvalue={3}
      maxvalue={33}
      text={"Latitude Range 3 - 33°N"}
    />
    <Selectbar
      value={[106, 128]}
      setFunction={setLon}
      minvalue={106}
      maxvalue={128}
      text={"Longitude Range 106 - 128°E"}
    />
    <SelectParameter value={parameters} setFunction={setParameters} />
  </>
);
}