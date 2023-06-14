import "../../../node_modules/leaflet/dist/leaflet.css";
import { useState } from "react";
import { Container, Box } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvent
} from "react-leaflet";

import DrawerIcon from "../drawer/DrawerIcon";

export default function Map({ onOpenNav}) {
  const [coordinates, setCoordinates] = useState(null);

  const handleMapMousemove = (e) => {
    setCoordinates(e.latlng);
  };

  const MapEvents = () => {
    useMapEvent({
      mousemove: handleMapMousemove,
    });
    return null;
  };
  

  return (
    <Container disableGutters maxWidth="100%" sx={{ mx: 0 }}>
      <MapContainer center={[23, 121]} zoom={7} zoomControl={false}>
        <DrawerIcon onOpenNav={onOpenNav}/>
        
        <MapEvents />
        
        {coordinates && (
          <Box component="span" className="coordinate-container" sx={{width:180, textAlign: 'center'}}>
            {coordinates.lat.toFixed(4)}&#176;, {coordinates.lng.toFixed(4)}&#176;
          </Box>
        )}
       
        <TileLayer
          url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />
        
        <ZoomControl position="topright" />
      </MapContainer>
    </Container>
  );
}
