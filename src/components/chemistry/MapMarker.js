import { useState, useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import stationsvg from "./SVG/blue_small_1.svg";
import orangesvg from "./SVG/orange_small_1.svg";
import greysvg from "./SVG/grey_small.svg";
import StationModal from "./StationModal";



const MarkerIcon = ({ isClicked, isHovered })=> useMemo(()=>{
  const iconUrl = isClicked ? greysvg : isHovered ? orangesvg : stationsvg;
  return L.icon({
  iconUrl,
  iconSize: [12, 12],
  iconAnchor: [5.6, 7],
  });
},[isClicked,isHovered])

const TooltipContent = ({object}) => useMemo(()=>(
  <>
  {object.properties.date} &nbsp; St:&nbsp;{object.properties.station}<br/>
  Click for data display.
  </>
),[object])


export default function MapMarker({
  object,
  objects,
  isClicked,
  isHovered,
  setActiveHover
}) {
  const [open, setOpen] = useState(false);

  const markerIcon = MarkerIcon({ isClicked, isHovered });
  const tooltipContent = TooltipContent({object});
  
  
  return (
    <>
      <Marker
        position={[
          object.geometry.coordinates[0],
          object.geometry.coordinates[1],
        ]}
        icon={markerIcon}
        eventHandlers={{
          mouseover: () => setActiveHover(object.properties.odb_cruise_id),
          mouseout: () => setActiveHover(null),
          click: () => setOpen(true),
        }}
        zIndexOffset={isClicked ? 9999 : isHovered ? 9999 : 500}
      >
        <Tooltip direction="top" offset={[0, 0]}>
        {tooltipContent}
        </Tooltip>
      </Marker>
      <StationModal open={open} setOpen={setOpen} object={object} objects={objects}/>
    </>
  );
}
