import "../../../node_modules/leaflet/dist/leaflet.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { Container, Box } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  ZoomControl,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import DrawerIcon from "../drawer/DrawerIcon";
import CircularProgress from "@mui/material/CircularProgress";
import {api} from './api';



//


export default function Map({ onOpenNav }) {
  const [jsonContent, setJsonContent] = useState();
  const [isMapReady, setIsMapReady] = useState(false);
  const [showLine, setShowLine] = useState(false);
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
 
  useEffect(()=>{
    fetch(api)
    .then(data=>data.json())
    .then(data=>setJsonContent(data))
    .catch((err) => console.log(`Error Reading data ${err}`));
  },[])
  useEffect(() => {
    if (mapRef.current && jsonContent) {
      console.log("jsoncontent有改變 就觸發裡面");
      //mapRef.current.fitBounds(geojsonRef.current?.getBounds());
    }
  }, [isMapReady, jsonContent]);

  //const pointToLayer = useCallback((feature, latlng) => {
  //  if (feature.properties && feature.properties.icon) {
  //    return L.marker(latlng, {
  //      icon: L.icon(feature.properties && feature.properties.icon),
  //    });
  //  }
//
  //  return L.marker(latlng, {
  //    icon: L.icon({
  //      iconUrl: markerIconPng,
  //      shadowUrl: markShadowPng,
  //    }),
  //  });
  //}, []);

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
        {jsonContent === undefined ? (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    style={{
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress color="secondary" />
  </Box>
) : (
  <Marker 
    position={[22.61319, 120.28746]}
    
    eventHandlers={{
      mouseover: () => setShowLine(true),
      mouseout: () => setShowLine(false),
    }}
  >
    {showLine && <GeoJSON key='line' data={jsonContent} />}
  </Marker>
)}
        
        {/* 放大縮小按鈕 */}
        <ZoomControl position="topright" />
      </MapContainer>
    </Container>
  );
}
