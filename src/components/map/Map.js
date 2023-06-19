import "../../../node_modules/leaflet/dist/leaflet.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { Container, Box, Popover, Typography } from "@mui/material";
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
import { api } from "./api";
import Warning from "./Warning";
import Icon from "./Icon.svg";

//

export default function Map({ onOpenNav }) {
  //api 拿資料成功與否的狀況
  //也用在等待期間的loader
  const [jsonContent, setJsonContent] = useState();
  const [isMapReady, setIsMapReady] = useState(false);
  //hover 到第一站的marker會顯示航跡和採樣的站
  const [showLine, setShowLine] = useState(false);
  const [showPoint, setShowPoint] = useState(false);
  // popover 是打開與否
  const [open, setopen] = useState(true);
  //Ref綁在地圖上
  const mapRef = useRef();
  //Ref綁在航跡上 使用者點該航跡時 視窗會自動把航跡置中用
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
  //一開始進來的時候 啟動api fetch
  useEffect(() => {
    fetch(api)
      .then((data) => data.json())
      .then((data) => setJsonContent(data))
      .catch((err) => console.log(`Error Reading data ${err}`));
  }, []);
  //map準備好&有jsonContent 即啟動
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
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setJsonContent();
  };
  console.log(jsonContent);

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
        {/* 資料還沒進來時 顯示loader */}
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
        ) : /* api返回沒有資料 會有Popover 提醒沒資料 */
        
        jsonContent === "No result" ? (
          <Warning />
        ) : (
          /* api返回資料 */
          <CircularProgress color="secondary" />
        )}

        {/* 放大縮小按鈕 */}
        <ZoomControl position="topright" />
      </MapContainer>
    </Container>
  );
}
