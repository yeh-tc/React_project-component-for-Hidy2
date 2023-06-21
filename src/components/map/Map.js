import "../../../node_modules/leaflet/dist/leaflet.css";
import React from "react";
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
import { api } from "./api";
import NoDataWarning from "./NoDataWarning";
import FailApiWarning from "./FailApiWarning";
import Waiting from "./Waiting";
import stationsvg from "./SVG/sta2.svg";

//

export default function Map({ onOpenNav }) {
  //api 拿資料成功與否的狀況
  //也用在等待期間的loader
  const [jsonContent, setJsonContent] = useState();
  const [checkAPI, setcheckAPI] = useState();
  const [isMapReady, setIsMapReady] = useState(false);

  //Ref綁在地圖上
  const mapRef = useRef();
  //Ref綁在航跡上 使用者點該航跡時 視窗會自動把航跡置中用
  const geojsonRef = useRef();

  ////
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
  /////
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

  let svgIcon = new L.Icon({
    iconUrl: stationsvg,
    iconSize: [27, 27], // size of the icon
    iconAnchor: [14, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const pointToLayer = useCallback((feature, latlng) => {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: stationsvg,
        iconSize: [30, 30],
        iconAnchor: [9, 9],
      }),
    });
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
        {/* 資料還沒進來時 顯示loader */}
        {checkAPI !== undefined ? (
          /*api出事的時候 checkAPI會有error message*/
          <FailApiWarning />
        ) : jsonContent === undefined ? (
          <Waiting />
        ) : /* api返回沒有資料 會有Popover 提醒沒資料 */

        jsonContent === "No result" ? (
          <NoDataWarning />
        ) : (
          <>
            {jsonContent.features.map((feature, index) => {
              console.log(hoverData);
              return (
                <React.Fragment key={feature.properties.id}>
                  <GeoJSON
                    data={{ type: "FeatureCollection", features: [feature] }}
                    pathOptions={{ color: "#F2F5F5", weight: 2 }}
                  />

                  <GeoJSON
                    data={feature.properties.bottle_sta[0]}
                    pointToLayer={pointToLayer}
                  />
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
