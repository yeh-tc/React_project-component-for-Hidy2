import { useState, useEffect, useCallback, useRef } from "react";
import { Box, Divider } from "@mui/material";
import { GeoJSON } from "react-leaflet";
import { useMap } from "react-leaflet";
import L from "leaflet";

import Scrollbar from "./scrollbar/Scrollbar";
import SelectControls from "./SelectControls";
import RenderDataList from "./RenderDataList";
import FailApiWarning from "./FailApiWarning";
import NoDataWarning from "./NoDataWarning";
import RemindParaWarning from "./RemindParaWarning";
import MapMarker from "./MapMarker";
import Waiting from "./Waiting";
import useDataFetch from "./useDataFetch";


export default function ChemistryData({ mapRef }) {
  const [Rv, setRv] = useState("*");
  const [lon, setLon] = useState([106, 128]);
  const [lat, setLat] = useState([3, 33]);
  const [date, setDate] = useState(["2004-08-14", "2012-10-29"]);
  const [parameters, setParameters] = useState(["none"]);
  const [activeHover, setActiveHover] = useState(null);
  const [activeClick, setActiveClick] = useState(null);

  const ref = useRef();
  const map = useMap();
  const layersRef = useRef({});



  //fetch data function
  const { loading, data, noData, info, marker } = useDataFetch(
    lon,
    lat,
    date,
    Rv,
    parameters
  );
  useEffect(() => {
    setActiveHover(null);
    setActiveClick(null);
  }, [loading]);

  //讓query後的結果置中於地圖
  useEffect(() => {
    if (
      data &&
      data !== "No result" &&
      data !== undefined &&
      data !== "connection error"
    ) {
      let bounds = new L.LatLngBounds();
      data.forEach((feature) => {
        let featureBounds = L.geoJSON(feature).getBounds();
        bounds.extend(featureBounds);
      });
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [data, mapRef]);

  ////GeoJson event handler
  const onEachFeature = (feature, layer) => {
    const cruiseId = feature.properties?.name.split("_");
    layersRef.current[`${cruiseId[0]}${cruiseId[1]}`] = layer;
    layer.bindTooltip(`${cruiseId[0]}-${cruiseId[1]}`, { sticky: true });
    layer.on({
      mouseover: () => {
        setActiveHover(`${cruiseId[0]}${cruiseId[1]}`);

        layer.bringToFront();
      },
      mouseout: () => {
        setActiveHover(null);
      },
      click: () => {
        setActiveClick(`${cruiseId[0]}${cruiseId[1]}`);
        layer.bringToFront();
        //單個GeoJson物件置中於地圖
        mapRef.current.fitBounds(layer._bounds);
      },
    });
  };
  //
  ////GeoJson style
  const styleFunc = useCallback(
    (feature) => {
      const cruiseId = feature.properties?.name.split("_");
      const isHovered = activeHover === `${cruiseId[0]}${cruiseId[1]}`;
      const isClicked = activeClick === `${cruiseId[0]}${cruiseId[1]}`;
      return {
        color: isClicked ? "#d62828" : isHovered ? "#EB862F" : "#6FBCD8",
        weight: isClicked ? 3 : 2,
      };
    },
    [activeHover, activeClick]
  );
  
  ////讓Datapanel scrollbar滑鼠滾動時與地圖不影響
  useEffect(() => {
    L.DomEvent.disableScrollPropagation(ref.current);
  });

  //讓Datapanel 移動slider時與地圖不影響
  const enterPanel = () => {
    map.dragging.disable();
  };
  const leavePanel = () => {
    map.dragging.enable();
  };
  //

  const isError = data === "connection error";

  return (
    <div ref={ref} onMouseEnter={enterPanel} onMouseLeave={leavePanel}>
      <Box
        position="absolute"
        top="5%"
        sx={{
          zIndex: 1000,
          width: "360px",
          height: "90%",
          backgroundColor: "background.paper",
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            "& .simplebar-content": {
              height: 1,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <SelectControls
            setRv={setRv}
            setDate={setDate}
            setLat={setLat}
            setLon={setLon}
            parameters={parameters}
            setParameters={setParameters}
          />
          <Divider />
          {info !== undefined &&
          <RenderDataList
            data={info}
            mapRef={mapRef}
            loading={loading}
            layersRef={layersRef}
            activeHover={activeHover}
            activeClick={activeClick}
            setActiveHover={setActiveHover}
            setActiveClick={setActiveClick}
          />}
        </Scrollbar>
      </Box>

      {parameters.toString() === ["none"].toString() ? (
        <RemindParaWarning />
      ) : loading ? (
        <Waiting />
      ) : isError ? (
        <FailApiWarning />
      ) : noData ? (
        <NoDataWarning />
      ) : (
        <>
          <GeoJSON
            data={data}
            style={styleFunc}
            onEachFeature={onEachFeature}
          />

          {marker && !isError && marker !== undefined &&
            marker.map((object, Index) => {
              const cruiseId = object.features[0].properties.odb_cruise_id;
              const isHovered = activeHover === cruiseId;
              const isClicked = activeClick === cruiseId;
              return object.features.map((station)=>
              (
                <MapMarker
                  object={station}
                  objects={marker[Index].features}
                  isHovered={isHovered}
                  isClicked={isClicked}
                  setActiveHover={setActiveHover}
                  setActiveClick={setActiveClick}/>
              
            ));
            })}
        </>
      )}
    </div>
  );
}
