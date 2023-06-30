import "leaflet/dist/leaflet.css";
import {  useRef } from "react";
import { Container } from "@mui/material";
import { MapContainer, TileLayer,Pane } from "react-leaflet";
import ChemistryData from "../components/chemistry/ChemistryData";

export default function Map() {
  const mapRef = useRef();
  return (
    <Container disableGutters maxWidth="100%" sx={{ mx: 0 }}>
      <MapContainer
        ref={mapRef}
        center={[23.5, 121]}
        zoom={7}
        minZoom={2}
        maxZoom={18}
        maxBounds={[
          [90, -239],
          [-90, 481],
        ]}
      >
        <TileLayer
          url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />

        <ChemistryData />
      </MapContainer>
    </Container>
  );
}
