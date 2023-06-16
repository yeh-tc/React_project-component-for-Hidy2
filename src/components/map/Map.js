import "../../../node_modules/leaflet/dist/leaflet.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { Container, Box } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import DrawerIcon from "../drawer/DrawerIcon";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markShadowPng from "leaflet/dist/images/marker-shadow.png";
//
const jsonContent = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [121, 22],
          [121, 23],
        ],
      },
      properties: {
        popupContent: "22,121",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [121, 22],
      },
      properties: {
        popupContent:
          "Maryland Institute College of Art is a leader in the world of visual arts featuring undergraduate, graduate, and certificate programs.",
        icon: {
          iconUrl: "https://img.icons8.com/nolan/256/university.png",
          iconSize: [30, 30],
          iconAnchor: [20, 0],
        },
      },
    },
  ],
};

export default function Map({ onOpenNav }) {
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef();
  const geojsonRef = useRef();
  //showing lon/lat on map when mouse moving on map
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

  useEffect(() => {
    if (mapRef.current && jsonContent) {
      console.log("jsoncontent有改變 就觸發裡面");
      mapRef.current.fitBounds(geojsonRef.current?.getBounds());
    }
  }, [isMapReady, jsonContent]);

  const pointToLayer = useCallback((feature, latlng) => {
    if (feature.properties && feature.properties.icon) {
      return L.marker(latlng, {
        icon: L.icon(feature.properties && feature.properties.icon),
      });
    }

    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: markerIconPng,
        shadowUrl: markShadowPng,
      }),
    });
  }, []);

  const onEachFeature = useCallback((feature, layer) => {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent, {
        autoClose: false,
      });
    }
  }, []);

  return (
    <Container disableGutters maxWidth="100%" sx={{ mx: 0 }}>
      <MapContainer
        center={[23, 121]}
        zoom={7}
        zoomControl={false}
        ref={mapRef}
        whenReady={() => setIsMapReady(true)}
      >
        <DrawerIcon onOpenNav={onOpenNav} />
        {/* 顯示滑鼠經緯度 */}
        <MapEvents />
        {coordinates && (
          <Box
            component="span"
            className="coordinate-container"
            sx={{ width: 180, textAlign: "center" }}
          >
            {coordinates.lat.toFixed(4)}&#176;, {coordinates.lng.toFixed(4)}
            &#176;
          </Box>
        )}

        <TileLayer
          url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />
        {/* 顯示航跡 */}
        {jsonContent && (
          <GeoJSON
            data={jsonContent}
            pointToLayer={pointToLayer}
            onEachFeature={onEachFeature}
            ref={geojsonRef}
          />
        )}
        {/* 放大縮小按鈕 */}
        <ZoomControl position="topright" />
      </MapContainer>
    </Container>
  );
}
