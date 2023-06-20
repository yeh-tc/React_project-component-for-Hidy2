import "../../../node_modules/leaflet/dist/leaflet.css";
import React from "react";
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
import { api } from "./api";
import NoDataWarning from "./NoDataWarning";
import FailApiWarning from "./FailApiWarning";
import Waiting from "./Waiting";



//

export default function Map({ onOpenNav }) {
  //api 拿資料成功與否的狀況
  //也用在等待期間的loader
  const [jsonContent, setJsonContent] = useState();
  const [checkAPI, setcheckAPI] = useState();
  const [isMapReady, setIsMapReady] = useState(false);
  
  //hover 到第一站的marker會顯示航跡和採樣的站
  const [showLine, setShowLine] = useState({});

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
      .catch((err) => setcheckAPI(err));
  }, []);
  //map準備好&有jsonContent 即啟動

  useEffect(() => {
    //const coords = [...jsonContent.features[0].geometry.coordinates[0]].reverse();
    //mapRef.current.fitBounds(geojsonRef.current?.getBounds());
  }, [isMapReady, jsonContent]);

  const handleMouseOver = (index) => {
    setShowLine({ [index]: true });
  };

  const handleMouseOut = (index) => {
    setShowLine({ [index]: false });
  };

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
        {checkAPI !== undefined ? (
          <FailApiWarning />
        ) : jsonContent === undefined ? (
          <Waiting/>
        ) : /* api返回沒有資料 會有Popover 提醒沒資料 */

        jsonContent === "No result" ? (
          <NoDataWarning />
        ) : (
          <>
            {jsonContent.features.map((feature, index) => {
              const coords = [...feature.geometry.coordinates[0]].reverse();
              return (

                <React.Fragment key={index}>
                <Marker
                position={coords}
                eventHandlers={{
                  mouseover: () => handleMouseOver(index),
                  mouseout: () => handleMouseOut(index),
                }}
              />
              
              {showLine[index] && (
                <GeoJSON data={{ type: "FeatureCollection", features: [feature] }} />
              )}
              </React.Fragment>
              );
            })}
          </>
        )}

        {/* 放大縮小按鈕 */}
        <ZoomControl position="topright" />
      </MapContainer>
    </Container>
  );
}
