import "../../../node_modules/leaflet/dist/leaflet.css";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Container, Box } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
  useMapEvent,
  Pane,
  Polyline,
} from "react-leaflet";
import { api } from "./api";
import L from "leaflet";
import DrawerIcon from "../drawer/DrawerIcon";
import NoDataWarning from "./NoDataWarning";
import FailApiWarning from "./FailApiWarning";
import Waiting from "./Waiting";
import MapMarker from "./MapMarker";
//

export default function Map({
  onOpenNav,
  setCruiseIdinDrawer,
  activeClick,
  activeHover,
  setActiveClick,
  setActiveHover,
  lon1,
  lon2,
  lat1,
  lat2,
  time1,
  time2,
  rv,
  parameter,
}) {
  //檢查api server是否出錯
  const [checkAPI, setcheckAPI] = useState();
  //檢查api連接成功後，返回的資料結果(沒資料="No results"，有資料會是json)
  const [jsonContent, setJsonContent] = useState();
  //地圖
  const [isMapReady, setIsMapReady] = useState(false);
  //Ref綁在地圖上
  const mapRef = useRef();
  //

  ////////////////////////////////////////////////////////////
  ////地圖右下角小窗格(可刪除 Hidy2已有)
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
  ////////////////////////////////////////////////////////////
  //
  //當filter參數改變 啟動api網址改變
  useEffect(() => {
    const api_address = `${api}lat_from=${lat1}&lat_to=${lat2}&lon_from=${lon1}&lon_to=${lon2}&date_from=${time1}&date_to=${time2}&RV=${rv}&var=${parameter}`;
    setJsonContent();
    setcheckAPI();
    setCruiseIdinDrawer(null);
    setActiveClick(null);
    setActiveHover(null);

    fetch(api_address)
      .then((data) => data.json())
      .then((data) => {
        setJsonContent(data);
        if (data !== "No result") {
          const ids_in_drawers = data.features.map((feature) => ({
            id: feature.properties.id,
            departure: feature.properties.depart,
            return: feature.properties.return,
            max_depth: feature.properties.max_dep,
            para: feature.properties.para,
            pi: feature.properties.pi,
          }));
          setCruiseIdinDrawer(ids_in_drawers);
        }
      })
      .catch((err) => {
        setcheckAPI(err);
      });
  }, [lon1, lon2, lat1, lat2, time1, time2, rv, parameter]);
  function flipCoordinates(coordinateArray) {
    return coordinateArray.map(coord => [coord[1], coord[0]]);
  }
  //依api搜尋結果，讓Map fit全部GeoJson的Bounds
  useEffect(() => {
    if (isMapReady && jsonContent && jsonContent !== "No result") {
      let bounds = new L.LatLngBounds();
      jsonContent.features.forEach((feature) => {
        //let flippedCoordinates = flipCoordinates(feature.geometry.coordinates);
        //let featureBounds = L.geoJSON({ ...feature, geometry: { ...feature.geometry, coordinates: flippedCoordinates } }).getBounds();
        let featureBounds = L.geoJSON(feature).getBounds();
        bounds.extend(featureBounds);
      });

      if (mapRef.current) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [isMapReady, jsonContent]);
  //放在航跡GeoJson上的eventhandler
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        setActiveHover(feature.properties.id);
        //layer.bindTooltip(feature.properties.id, {
        //  className: "marker-tooltip",
        //});
      },
      mouseout: () => {
        setActiveHover(null);
      },
      click: () => {
        setActiveClick(feature.properties.id);

        //單個GeoJson物件置中於地圖
        mapRef.current.fitBounds(layer._bounds);
      },
    });
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
              const isHovered = activeHover === feature.properties.id;
              const isClicked = activeClick === feature.properties.id;
              console.log(feature)
              return (
                <React.Fragment key={feature.properties.id}>
                  <Pane style={{ zIndex: isClicked ? 1000 : 500 }}>
                    <GeoJSON
                      data={{ type: "FeatureCollection", features: [feature] }}
                      pathOptions={{
                        color: isClicked
                          ? "#F2F5F5"
                          : isHovered
                          ? "#EB862F"
                          : "#6FBCD8",
                        weight: 4,
                      }}
                      onEachFeature={onEachFeature}
                    />
                    </Pane>
                    
                  {/*<Polyline
                    positions={feature.geometry.coordinates}
                    pathOptions={{
                      color: isClicked
                        ? "#F2F5F5"
                        : isHovered
                        ? "#EB862F"
                        : "#6FBCD8",
                        weight: 1.5
                    }}
                    
                    eventHandlers={{
                      mouseover: () => setActiveHover(feature.properties.id),
                      mouseout: () => setActiveHover(null),
                      click: () => {
                        setActiveClick(feature.properties.id);
                        let flippedCoordinates = flipCoordinates(feature.geometry.coordinates);
                        let bounds = L.geoJSON({ ...feature, geometry: { ...feature.geometry, coordinates: flippedCoordinates } }).getBounds();
                        mapRef.current.fitBounds(bounds);
                        }
                    }}
                    
                  />*/}
                  

                  {feature.properties.bottle_sta[0].features.map(
                    (object, index) => {
                      return (
                        <MapMarker
                          key={index}
                          object={object}
                          isHovered={isHovered}
                          isClicked={isClicked}
                          id={feature.properties.id}
                          setActiveHover={setActiveHover}
                        />
                      );
                    }
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
