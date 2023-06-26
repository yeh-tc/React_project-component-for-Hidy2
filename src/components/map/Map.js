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
  Marker
} from "react-leaflet";
import L from "leaflet";
import DrawerIcon from "../drawer/DrawerIcon";
import { api } from "./api";
import NoDataWarning from "./NoDataWarning";
import FailApiWarning from "./FailApiWarning";
import Waiting from "./Waiting";
import stationsvg from "./SVG/blue_small.svg";
import orangesvg from "./SVG/orange_small.svg";

//


export default function Map({ onOpenNav, setSelectCruiseId, activeCruise  }) {
  //api 拿資料成功與否的狀況
  //也用在等待期間的loader
  const [jsonContent, setJsonContent] = useState();
  const [apiweb, setApiweb] = useState(api);
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
    setJsonContent();
    setcheckAPI();
    setSelectCruiseId(null);
    
    fetch(api)
      .then((data) => data.json())
      .then((data) => {
        setJsonContent(data);
        const ids = data.features.map((feature) => {
          return(
          [{"id":feature.properties.id,
          "departure":feature.properties.depart,
          "return":feature.properties.return,
          "max_depth":feature.properties.max_dep,
          "para":feature.properties.para}]
          )});
        setSelectCruiseId(ids);

      })
      .catch((err) => {
        setcheckAPI(err);
      });
  }, [apiweb]);

  const pointToLayer = useCallback((feature, latlng) => {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: stationsvg,
        iconSize: [12, 12],
        iconAnchor: [5.6, 7],
      }),
    });
  }, [activeCruise]);

 
  const onEachFeature = useCallback((feature, layer) => {
    if (feature.properties) {
      
      const popupContent =`Date:&nbsp;${feature.properties.date}<br/>Station:&nbsp;${feature.properties.station}<br/>`
      layer.bindTooltip(popupContent);
      
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
              const isActive = activeCruise === feature.properties.id;
              return (
                <React.Fragment key={feature.properties.id}>
                  <GeoJSON
                    data={{ type: "FeatureCollection", features: [feature] }}
                    pathOptions={{ color:isActive ? "#E28232" : "#6FBCD8" , weight: 2 }}
                  />

                  <GeoJSON
                    data={feature.properties.bottle_sta[0]}
                    pointToLayer={pointToLayer}
                    onEachFeature={onEachFeature}
                  />
                  {feature.properties.bottle_sta[0].features.map((object,index)=>{
                    return(
                      <Marker position={[object.geometry.coordinates[1],object.geometry.coordinates[0]]}
                      icon={L.icon({
                        iconUrl: activeCruise === feature.properties.id ? orangesvg : stationsvg,
                        iconSize: [12, 12],
                        iconAnchor: [5.6, 7],
                      })} />
                    )
                  })}
                  
                 
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
