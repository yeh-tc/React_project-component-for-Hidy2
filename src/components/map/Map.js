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
} from "react-leaflet";
import L from "leaflet";
import DrawerIcon from "../drawer/DrawerIcon";
import { api } from "./api";
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
}) {
  //api網址
  const [apiUrl, setApiUrl] = useState(api);
  //檢查api server是否出錯
  const [checkAPI, setcheckAPI] = useState();
  //檢查api連接成功後，返回的資料結果，沒資料="No results"，有資料會是json
  const [jsonContent, setJsonContent] = useState();
  //地圖
  const [isMapReady, setIsMapReady] = useState(false);

  //Ref綁在地圖上
  const mapRef = useRef();

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
  //當api網址改變即啟動
  useEffect(() => {
    //把之前的資料洗掉和state恢復
    setJsonContent();
    setcheckAPI();
    setCruiseIdinDrawer(null);
    setActiveClick(null);
    setActiveHover(null);

    fetch(api)
      .then((data) => data.json())
      .then((data) => {
        setJsonContent(data)
        if (data !== "No result") {
          //放進Drawer內的文字
          const ids_in_drawers = data.features.map((feature) => {
            return [
              {
                id: feature.properties.id,
                departure: feature.properties.depart,
                return: feature.properties.return,
                max_depth: feature.properties.max_dep,
                para: feature.properties.para,
                pi: feature.properties.pi,
              },
            ];
          });
          setCruiseIdinDrawer(ids_in_drawers);
        
        }
      })
      .catch((err) => {
        setcheckAPI(err);
      });
  }, [apiUrl]);
  //依api搜尋結果，讓Map fit全部GeoJson的Bounds
  useEffect(() => {
    if (isMapReady && jsonContent && jsonContent !== "No result") {
      let bounds = new L.LatLngBounds();
      jsonContent.features.forEach((feature) => {
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
