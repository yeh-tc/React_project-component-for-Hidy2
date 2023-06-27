import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import stationsvg from "./SVG/blue_small_1.svg";
import orangesvg from "./SVG/orange_small_1.svg";
import greysvg from "./SVG/grey_small.svg";

export default function MapMarker({
  object,
  isClicked,
  isHovered,
  id,
  setActiveHover
}) {
  return (
    <Marker
      position={[
        object.geometry.coordinates[1],
        object.geometry.coordinates[0],
      ]}
      icon={L.icon({
        iconUrl: isClicked ? greysvg : isHovered ? orangesvg : stationsvg,
        iconSize: [12, 12],
        iconAnchor: [5.6, 7],
      })}
      eventHandlers={{
        mouseover: () => setActiveHover(id),
        mouseout: () => setActiveHover(null),
      }}
    >
        <Tooltip
        direction="top"
        offset={[0, 0]}
        className="marker-tooltip"
      >
        {object.properties.date} &nbsp; {object.properties.station}
      </Tooltip>
    </Marker>
  );
}
