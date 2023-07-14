import { useState, useEffect, useCallback, useRef } from "react";
import { Box, Divider } from "@mui/material";
import { GeoJSON } from "react-leaflet";
import { api } from "./api";
import { useMap } from "react-leaflet";
import L from "leaflet";
import SelectCruise from "./SelectCruise";
import SelectDate from "./SelectDate";
import Selectbar from "./Selectbar";
import Scrollbar from "./scrollbar/Scrollbar";
import SelectParameter from "./SelectParameter";
import RenderDataList from "./RenderDataList";
import FailApiWarning from "./FailApiWarning";
import NoDataWarning from "./NoDataWarning";
import RemindParaWarning from "./RemindParaWarning";
import MapMarker from "./MapMarker";
import Waiting from "./Waiting";

export default function ChemistryData({ mapRef }) {
  const [loading, setLoading] = useState(true);
  const [Rv, setRv] = useState("*");
  const [lon, setLon] = useState([106, 128]);
  const [lat, setLat] = useState([3, 33]);
  const [date, setDate] = useState(["1995-05-20", "2012-10-29"]);
  const [parameters, setParameters] = useState(["none"]);
  const [data, setData] = useState();
  const [noData, setNoData] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const ref = useRef();
  const map = useMap();
  //fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setData();
    setNoData(false);
    setActiveHover(null);
    setActiveClick(null);
    const url = `${api}/bottlediver?lat_from=${lat[0]}&lat_to=${lat[1]}&lon_from=${lon[0]}&lon_to=${lon[1]}&date_from=${date[0]}&date_to=${date[1]}&RV=${Rv}&var=${parameters.join(",")}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      if (data === null || data.status === "No result") {
        setNoData(true);
      }
    } catch (error) {
      setData("connection error");
    } finally {
      setLoading(false);
    }

  },[Rv, lon, lat, date, parameters])
  //query 改變時啟動
  useEffect(() => {
    if (parameters.toString() !== ["none"].toString()) {
      fetchData();
    }
  }, [fetchData,parameters]);

  //讓query後的結果置中於地圖
  useEffect(() => {
    if (
      data &&
      data.status !== "No result" &&
      data !== undefined &&
      data !== "connection error"
    ) {
      let bounds = new L.LatLngBounds();
      data.status.forEach((feature) => {
        let featureBounds = L.geoJSON(feature).getBounds();
        bounds.extend(featureBounds);
      });
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [data, mapRef]);

  //GeoJson event handler
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        setActiveHover(feature.properties.id);
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

  //GeoJson style
  const styleFunc = useCallback((feature) => {
    const isHovered = activeHover === feature.properties.id;
    const isClicked = activeClick === feature.properties.id;
    return {
      color: isClicked ? "#F2F5F5" : isHovered ? "#EB862F" : "#6FBCD8",
      weight: 2,
    };
  },[activeHover, activeClick]);
  //讓Datapanel scrollbar滑鼠滾動時與地圖不影響
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
  const isError = data === "connection error";
  console.log(data)
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
          <SelectCruise setRv={setRv} />
          <SelectDate setFunction={setDate} />
          <Selectbar
            value={lat}
            setFunction={setLat}
            minvalue={3}
            maxvalue={33}
            text={"Latitude Range 3 - 33°N"}
          />
          <Selectbar
            value={lon}
            setFunction={setLon}
            minvalue={106}
            maxvalue={128}
            text={"Longitude Range 106 - 128°E"}
          />
          <SelectParameter value={parameters} setFunction={setParameters} />
          <Divider />
          <RenderDataList
            data={data}
            mapRef={mapRef}
            activeHover={activeHover}
            activeClick={activeClick}
            setActiveHover={setActiveHover}
            setActiveClick={setActiveClick}
          />
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
            data={data.status}
            style={styleFunc}
            onEachFeature={onEachFeature}
          />
          {data && !isError && data.status !== "No result" &&
            data.status.flatMap((object) => {
              const isHovered = activeHover === object.properties.id;
              const isClicked = activeClick === object.properties.id;
              return object.properties.bottle_sta[0].features.map((sta,index)=>{
                return (
                  <MapMarker
                  key={`${sta.properties.station}-${object.properties.id}`}
                  object={sta}
                  isHovered={isHovered}
                  isClicked={isClicked}
                  id={object.properties.id}
                  setActiveHover={setActiveHover}
                />
                );
              })
              
            })
            }
        </>
      )}
    </div>
  );
}
